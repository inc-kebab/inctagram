import { SomeUserProfile, getSSRForSomeUserProfile } from '@/widgets/profile'

export const getServerSideProps = getSSRForSomeUserProfile(false)

const Profile = () => <SomeUserProfile />

export default Profile
