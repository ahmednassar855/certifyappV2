import React from 'react'
import { ProfileWrapper, Photo, Name, Details, DetailItem } from './../../assets/wrappers/Profile';
import photoPerson from '../../assets/images/pers.jpg'
import { toast } from 'react-toastify';
import customFetch from '../../utils/customFetch';
import { useLoaderData, useParams } from 'react-router-dom';


export const loader = async({params}) => {
  console.log(params.candidateBadgeId , 'ffffffffffffffffffffffff');
  try {
    const {data} = await customFetch.get(`/candidate/getAllBadges/${params.candidateBadgeId}`) 
    return data;
    // /viewCandidateBadge/:candidateBadgeId
  } catch (error) {
    toast.error(error?.response?.data?.message)
    return error
  }
}


const ProviderAwardingBadgeProfile = () => {

  const {data} = useLoaderData();
  console.log(data.badges , data.candidate , 'sssssssssssssss');

  const profileData = {
    photoUrl: data.candidate.candidateProfilePhoto,
    name: data.candidate.firstName + " " +  data.candidate.familyName,
    birthDate: data.candidate.DOBirth,
    country: data.candidate.country,
    city: data.candidate.city,
    email: data.candidate.email,
    phone: data.candidate.phoneNumber,
    address: data.candidate.address + "-" + data.candidate.city + " " + data.candidate.country,
  };
  return (
    <ProfileWrapper>
    <Photo>
      <img src={profileData.photoUrl} alt="Profile" />
    </Photo>
    <Name>{profileData.name}</Name>
    <Details>
      <DetailItem>
        <strong>Birth Date:</strong> {profileData.birthDate}
      </DetailItem>
      <DetailItem>
        <strong>Country:</strong> {profileData.country}
      </DetailItem>
      <DetailItem>
        <strong>City:</strong> {profileData.city}
      </DetailItem>
      <DetailItem>
        <strong>Email:</strong> {profileData.email}
      </DetailItem>
      <DetailItem>
        <strong>Phone:</strong> {profileData.phone}
      </DetailItem>
      <DetailItem>
        <strong>Address:</strong> {profileData.address}
      </DetailItem>
    </Details>
  </ProfileWrapper>
  )
}

export default ProviderAwardingBadgeProfile