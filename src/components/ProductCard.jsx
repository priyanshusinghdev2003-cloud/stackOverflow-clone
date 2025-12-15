import { useEffect, useRef } from "react";
import gsap from "gsap";

function ProductCard({ product }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    gsap.set(el, { y: 0 });

    el.addEventListener("mouseenter", () => {
      gsap.to(el, { y: -20, duration: 0.3 });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(el, { y: 0, duration: 0.3 });
    });
  }, []);

  return (
    <div ref={cardRef} className="group relative h-96 w-[30rem] shrink-0">
      <img
        src={product.thumbnail}
        className="absolute inset-0 h-full w-full object-cover"
        alt={product.title}
      />
      <div className="absolute inset-0 bg-black opacity-0 transition group-hover:opacity-80" />
      <h2 className="absolute bottom-4 left-4 text-white opacity-0 transition group-hover:opacity-100">
        {product.title}
      </h2>
    </div>
  );
}
export default ProductCard;
