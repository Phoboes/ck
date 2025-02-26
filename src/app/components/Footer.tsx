import { Phone, Mail, MapPinHouse } from "lucide-react";
interface FooterData {
  addressLine1: string | undefined;
  addressLine2: string | undefined;
  city: string | undefined;
  postcode: string | undefined;
  email: string;
  phoneNumber: string;
}

export default async function Footer({
  footerData,
}: {
  footerData: FooterData;
}) {
  return (
    <footer className="navFooter md:py-4">
      <div className="flex flex-col md:flex-row md:justify-around max-w-4xl mx-auto">
        <div className="pt-4 px-8 mr-8 text-left w-full py-1 min-w-80 max-w-100 md:py-4 md:w-1/2">
          {footerData.addressLine1 ||
          footerData.addressLine2 ||
          footerData.city ||
          footerData.postcode ? (
            <MapPinHouse className="mr-4 inline-block" />
          ) : null}
          {footerData.addressLine1 ? (
            <>
              <p className="inline-block">
                {footerData.addressLine1}
                {footerData.addressLine2 ||
                footerData.city ||
                footerData.postcode ? (
                  <>,&nbsp;</>
                ) : null}
              </p>
            </>
          ) : null}
          {footerData.addressLine2 ? (
            <p className="inline-block md:block md:ml-10">
              {footerData.addressLine2}
              {footerData.city ? <>,&nbsp;</> : null}
            </p>
          ) : null}
          {footerData.city ? (
            <p className="inline-block md:block md:ml-10">
              {footerData.city}
              {footerData.postcode ? <>,&nbsp;</> : null}
            </p>
          ) : null}
          {footerData.postcode ? (
            <p className="inline-block md:block md:ml-10">
              {`${footerData.postcode}`}
            </p>
          ) : null}
        </div>
        <div className=" px-8 pb-4 text-center min-w-80 max-w-100 md:text-left md:py-4 md:w-1/2 md:ml-12">
          {footerData.email ? (
            <p className="flex flex-row py-1 mr-8">
              <Mail className="mr-4" />
              <a href={`mailto:${footerData.email}`}>{footerData.email}</a>
            </p>
          ) : null}
          {footerData.email ? (
            <p className="flex flex-row py-1 mr-8">
              <Phone className="mr-4" />
              <a href={`tel:${footerData.phoneNumber}`}>
                {footerData.phoneNumber}
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
