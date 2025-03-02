import getServiceCards from "@/lib/getServiceCards";
import ServiceCard from "./ServiceCard";
export default async function ServiceCards() {
  const serviceCardArray = await getServiceCards();
  const serviceCards = serviceCardArray.map((serviceCard) => (
    <ServiceCard key={Math.random()} serviceCard={serviceCard} />
  ));
  // console.log(serviceCards);
  return (
    <div className="flex flex-col md:flex-row m-auto md:justify-around w-full pt-6 max-w-[1200px]">
      {serviceCards}
    </div>
  );
}
