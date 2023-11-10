import { getAuthData } from "../../utils/auth"

export default function SubsRequest() {
  const text = getAuthData().email;
  return (
    <>
      <h1 className="mt-[500px]">Subscription Request</h1>
      <p>{text}</p>
    </>

  )
};
