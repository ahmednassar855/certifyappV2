
import { sendEmail } from '../../utils/email.js';
import { resetPsswordTemplate } from '../../utils/resetPasswordHtml.js';
import AppErr from '../../utils/AppErr.js';
import catchAsync from '../../utils/catchAsync.js';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { createSendToken } from '../../utils/createSendToken.js';


export const forgetPassword = (model) => {
 return catchAsync(async (req, res, next) => {
  //1) get the user obj from db
  // console.log(req.body.email , 'sssssssssssssssssssssssssssssssssssssss');
  const user = await model.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new AppErr('no user with this email,please enter right email', 404)
    );
  }
  //2) generate random reset token
     const resetToken = crypto.randomBytes(32).toString('hex');
     // hashing the token to store it to database
     user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
     user.passwordResetExpires = Date.now() + 10 * 60 * 1000;


  await user.save({ validateBeforeSave: false });
  //3) send it to user email
  // console.log(user);
  const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/${user.role=='provider'?'provider': user.role== 'candidate'? 'candidate' :user.role== 'examiner'?'examiner': user.role== 'admin' ? 'admin' : null}/resetPassword/${resetToken}`;
  const message = `forgot your password ? submit a PATCH request with new password and confirm password to 
  : ${resetUrl}.\n if you didn't please IGNORE`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'reset token (only valid for 10 min)',
      template: resetPsswordTemplate(resetUrl)
    });
    res.status(200).json({
      status: 'success',
      message: 'token is sent to the email of the user ',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppErr('failed to send email , try again later', 500));
  }
})};


export const verifyEmail= (model) => {
    return catchAsync(async (req, res, next) => {
      const { verificationCode , email} = req.body;
      console.log(verificationCode , req.body);
  
      const user = await model.findOne({ verificationCode ,email});
      console.log(user);
      // Check if the user and the verification code are valid
      if (!user || !user.verificationCodeExpires || Date.now() > user.verificationCodeExpires) {
        return next(new AppErr('Invalid or expired verification code', 400));
      }

      user.isEmailVerified = true;
      user.verificatinCode = undefined;
      user.verificationCodeExpires = undefined;
      await user.save();
      createSendToken(user, 200, res);
    });
  };
  


export const resetPassword =(model) => {
    return catchAsync(async (req, res, next) => {
        //1)Get user based on the token
        const resetToken = req.params.token;
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        //2) reset password if the token is not expired , and there is a user
        const user = await model.findOne({
          passwordResetToken: hashedToken, 
          passwordResetExpires: { $gt: Date.now() },
        });
        if (!user) {
          return next(new AppErr('token is invalid or expired', 404));
        }
        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        user.passwordChangedAt = Date.now() - 3000
        await user.save();
        createSendToken(user, 200, res);
})};

export const updatePassword =(model) => { 
    return catchAsync(async (req, res, next) => {
      const {oldPassword ,newPassword ,  passwordConfirm} = req.body
      const user = await model.findById(req.user._id).select('+password');
      if (!user || !(await bcrypt.compare(oldPassword, user.password)))
           return  next(new AppErr('invalid password', 400));
      user.password = newPassword
      user.passwordConfirm = passwordConfirm;
      user.passwordChangedAt = Date.now() - 3000
      await user.save({ validateBeforeSave: false });
      createSendToken(user, 200, res);
})};

// export const login = (model) => { 
//   return catchAsync(async (req, res, next) => {
//   const { email, password } = req.body;
//   const user = await model.findOne({ email }).select('+password');
  
//   if (!user || !(await bcrypt.compare(password, user.password)))
//   return  next(new AppErr('invalid email or password', 400));
//   if(!user.isEmailVerified)
//       next(new AppErr('the email is not verified , please verify your email', 401))
//   if(user.status !== 'approved')
//       next(new AppErr('the email is not active , please wait the admin activation', 401))
//     createSendToken(user , 200 , res);
// })};

export const login = (model) => { 
  return catchAsync(async (req, res, next) => {

  const { email, password } = req.body;
  const user = await model.findOne({ email }).select('+password');
 
  if(!user) 
        return  next(new AppErr('no user found with this email', 404));

  if (!(await bcrypt.compare(password, user.password)))
       return  next(new AppErr('invalid email or password', 400));

  if(!user.isEmailVerified)
       return next(new AppErr('the email is not verified , please verify your email', 401))

  if(user.status !== 'approved')
      return next(new AppErr('the email is not active , please wait the admin activation', 401))
    
    createSendToken(user , 200 , res);
})};



export const  getCurrentUser = () => {
  return catchAsync(async (req, res, next) => {
    console.log(req.user , 'ssssssssssss');
    res.json({ user : req.user})
  })
}