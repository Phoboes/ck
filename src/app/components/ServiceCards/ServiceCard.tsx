import Image from "next/image";
import styles from "./page.module.scss";

interface Media {
  name: string;
  caption: string;
  alternativeText: string;
  url: string;
}

interface ServiceCardData {
  title: string;
  image: Media[];
  description: string;
}

export default function ServiceCard({
  serviceCard,
}: {
  serviceCard: ServiceCardData;
}) {
  return (
    <div
      className={`mx-1 md:w-1/5 flex flex-col items-center relative min-w-[300px] rounded-md mt-4 overflow-hidden shadow-lg ${styles.serviceCard}`}
    >
      <h3 className={`w-full text-xl p-3 top-0 md:top-10 absolute`}>
        {serviceCard.title}
      </h3>
      <div className="w-full h-[300px]">
        <Image
          src={serviceCard.image[0].url}
          alt={
            serviceCard.image[0].alternativeText ||
            serviceCard.title ||
            "Service card image"
          }
          width={200}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>
      <p className={`py-5 px-6 text-left `}>{serviceCard.description}</p>
    </div>
  );
}
