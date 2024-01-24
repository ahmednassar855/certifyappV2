import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Test,

  HomeLayout,
  Landing,
  About,
  Contact,
  Error,
  DashboardLayout,
  CheckCertificatesProfile,
  ProfileCertificate,
  DueBagdeCertificate,
  ValideBagdCertificate,
  MainRegister,
  RegisterCandidateV2,
  RegisterApprover,
  VerificationCode,
  RegisterAcademyV2,
  Login,
  ResetPassword,

  // candidate
  CandidateProfile,
  CandidateBadges,
  CandidateUpdateInformation,

  // provider
  ProviderProfile,
  ProviderBadgeHolder,
  ProviderPendingRequests,
  ProviderDeclinedBadge,
  ProviderAddNewBadge,
  ProviderAwardingBadge,
  ProviderBadgeList,
  ProviderAwardingBadgeToAwardBadge,
  ProviderAwardingBadgeProfile,
  ProviderAwardingBadgeList,
  ProviderAwardingBadgeSearch,

  // PersonelCertificate
  PersonelCertificateProfile,
  PersonelCertificateAllBadges,
  PersonelCertificate,

  // badge
  EditBadge,
  

} from "./pages";
import TermsCondition from "./pages/Auth/Candidate/TermsCondition";


import { action as registerAcademyAction } from './pages/Auth/RegisterAcademyV2'; 
import { action as registerCandidateAction } from './pages/Auth/RegisterCandidateV2'; 

import { action as verifiyCodeAction } from './pages/Auth/VerificationCode'; 
import { action as loginAction } from './pages/Auth/Login'; 
import { action as AddBadgeAction } from './pages/Provider/ProviderAddNewBadge'; 


import { loader as DashboardLoader } from './pages/DashboardLayout';
import { loader as AllBadgesLoader } from './components/AllBadges';
import { loader as EditBadgeLoader } from './pages/Badge/EditBadge';
import { action as EditBadgeAction } from './pages/Badge/EditBadge';
import { action as deleteBadgeAction } from './pages/Badge/DeleteBadge';

// award badge
import { action as getCandidateToAwardBadgeAction } from './pages/Provider/ProviderAwardingBadgeSearch';
import { loader as getCandidateProfileToAwardLoader } from './pages/Provider/ProviderAwardingBadgeProfile'

export const checkDefaultThem = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

checkDefaultThem();

const router = createBrowserRouter([
  { path: "terms-conditions", element: <TermsCondition /> },
  
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      { path: "test1", element: <Test /> },
      { path: "about-us", element: <About /> },
      { path: "Contact-us", element: <Contact /> },
      { path: "login", element: <Login /> ,action: loginAction},
      { path: "check-cerificates-profile", element: <CheckCertificatesProfile /> },
      { path: "reset-password", element: <ResetPassword /> },

      // register
      {
        path: "register",
        children: [
          { index: true, element: <MainRegister /> },
          { path: "candidate", element: <RegisterCandidateV2 />  , action: registerCandidateAction},
          { path: "examiner", element: <RegisterApprover /> },
          { path: "academy", element: <RegisterAcademyV2 />  , action: registerAcademyAction},
          { path: "email-verification", element: <VerificationCode />  , action: verifiyCodeAction},

          // verifyEmail
        ],
      },
    ],
  },
  // valid-cerificate
  {
    path: "dashboard",
    element: <DashboardLayout />,
    errorElement: <Error />,
    loader: DashboardLoader,
    children: [
      // profile get without any login using email or registratino number only
      { path : 'personel-certificate', element :<PersonelCertificate/>, children: [
        { index: true, element: <PersonelCertificateProfile /> },
        { path: "all-badges", element: <PersonelCertificateAllBadges /> },
      ],},
      // shall check the ceritifcateId when we request it due to if put anyworrds this link will work
      //  shall check the id or email before log in
      {
        path: ":certificateId",
        children: [
          { index: true, element: <ProfileCertificate /> },
          { path: "valid-badge", element: <ValideBagdCertificate /> },
          { path: "due-badge", element: <DueBagdeCertificate /> },
        ],
      },

      // candidate
      {
        path: "candidate",
        children: [
          { index: true, element: <CandidateProfile /> },
          { path: "all-badges", element: <CandidateBadges /> },
        ],
      },

      // provider
      {
        path: "academy",
        errorElement: <Error />,
        children: [
          { index: true, element: <ProviderProfile /> },
          { path: "profile", element: <ProviderProfile /> },
          { path: "all-badges", element: <ProviderBadgeList /> , loader: AllBadgesLoader},
          { path: "add-badge", element: <ProviderAddNewBadge />  , action: AddBadgeAction},
          { path: "edit-badge/:badgeId", element: <EditBadge /> , loader: EditBadgeLoader , action :EditBadgeAction },
          {path: "delete-badge/:badgeId" , action : deleteBadgeAction},
          
          { path: "update-information", element: <CandidateUpdateInformation /> },
          { path: "holder-badges", element: <ProviderBadgeHolder /> },
          { path: "declined-badges", element: <ProviderDeclinedBadge /> },
          { path: "pending-badges", element: <ProviderPendingRequests /> },
          {
            path: "award-badge" , element: <ProviderAwardingBadge />,
            children: [
              { index: true, element: <ProviderAwardingBadgeSearch /> , action: getCandidateToAwardBadgeAction},
              { path: ":candidateBadgeId", element: <ProviderAwardingBadgeProfile /> , loader : getCandidateProfileToAwardLoader},
              // { path: "profile", element: <ProviderAwardingBadgeProfile /> },
              { path: "all-badges", element: <ProviderAwardingBadgeList /> },
              {
                path: "awarding-new-badge",
                element: <ProviderAwardingBadgeToAwardBadge />,
              },
            ],
          },
          
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
