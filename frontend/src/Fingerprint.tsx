import { getFingerprint } from "@thumbmarkjs/thumbmarkjs";
import { useEffect, useState } from "react";

export const Fingerprint = () => {
  const [fingerprint, setfingerprint] = useState<string | null>(null);

  useEffect(() => {
    getFingerprint().then((fingerprint) => setfingerprint(fingerprint));
  }, []);

  return <div>{fingerprint}</div>;
};
export default Fingerprint;
