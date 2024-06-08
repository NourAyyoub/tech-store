import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="max-w-container mx-auto px-4">
      <div className="pb-10">
        <h1 className="max-w-[600px] text-base text-lightText mb-2">
          <span className="text-primeColor font-semibold text-lg">
            Tech Stor
          </span>{" "}
          is a Palestinian electronics and gaming store located in the heart of
          Nablus. We are dedicated to providing our customers with the latest in
          technology and entertainment products at competitive prices. At Tech
          Stor, you will find a wide range of electronics, from the newest
          smartphones and laptops to high-quality home appliances and
          accessories.
        </h1>
        <p className="max-w-[600px] text-base text-lightText mb-4">
          Our mission is to deliver exceptional customer service and ensure that
          every visit to our store is a pleasant and satisfying experience. We
          are proud of our roots in Nablus, a city known for its rich history
          and vibrant culture, and we strive to reflect these values in
          everything we do. Whether you're a tech enthusiast looking for the
          latest gadgets or a gamer searching for the newest titles, Tech Stor
          has something for everyone.
        </p>
        <p className="max-w-[600px] text-base text-lightText mb-4">
          We believe in supporting our local community by offering products that
          meet the needs and preferences of our customers. Our team of
          knowledgeable and friendly staff is always ready to assist you in
          finding the perfect product and provide expert advice. At Tech Stor,
          your satisfaction is our priority.
        </p>
        <p className="max-w-[600px] text-base text-lightText mb-4">
          In addition to our extensive product range, we also offer various
          services to enhance your shopping experience. Our services include
          repair and maintenance for electronic devices, installation assistance
          for home appliances, and personalized recommendations to help you make
          informed purchasing decisions. We continuously update our inventory to
          include the latest and most innovative products, ensuring that you
          have access to the best technology available.
        </p>
        <p className="max-w-[600px] text-base text-lightText mb-4">
          Tech Stor is more than just a store; it is a part of the Nablus
          community. We actively engage in local events and initiatives to
          promote technology education and digital literacy. Our goal is to
          empower our customers and community by providing access to
          cutting-edge technology and fostering a culture of innovation and
          learning.
        </p>
        <Link to="/shop">
          <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}
