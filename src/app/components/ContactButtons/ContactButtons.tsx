import { Phone, Mail } from "lucide-react";
import styles from "./ContactButtons.module.scss";

interface ContactButtonsProps {
  phoneNumber: string;
  email: string;
}

export default function ContactButtons({
  phoneNumber,
  email,
}: ContactButtonsProps) {
  return (
    <>
      {phoneNumber && email ? (
        <div className="flex flex-row justify-around my-12 max-w-4xl mx-auto">
          <a
            href={`tel:${phoneNumber}`}
            className={`flex flex-row py-4 px-4 md:px-8 hover:shadow-lg shadow-gray-800 rounded-2xl md:w-1/3 md:justify-center font-bold ${styles.actionButtons}`}
          >
            <Phone className="mr-4" /> Call us
          </a>
          <a
            href={`mailto:${email}`}
            className={`flex flex-row py-4 px-4 md:px-8 hover:shadow-lg shadow-gray-800 rounded-2xl md:w-1/3 md:justify-center font-bold ${styles.actionButtons}`}
          >
            <Mail className="mr-4" /> Email us
          </a>
        </div>
      ) : null}
    </>
  );
}
