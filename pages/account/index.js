import { useRouter } from 'next/router'

import { requireUser } from '../../utils/auth';

export default function AccountPage(props) {
  return (
    <>
      <div>My Account</div>
    </>
  )
}

export async function getServerSideProps({ req, res }) {
  requireUser(req, res);

  return {
    props: {},
  }
}
