import { SomeUserProfile, getSSRForSomeUserProfile } from '@/widgets/profile'

export const getServerSideProps = getSSRForSomeUserProfile(true)

const PublicProfile = () => <SomeUserProfile publicProfile />

export default PublicProfile
