import { AnimatedTestimonials } from "../components/animated-testimonials";

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "Provides care for mental health conditions, including depression, anxiety, schizophrenia, and substance abuse disorders.",
      name: "Dr. Taylor",
      designation: "Psychiatrist",
      src: "./public/girl2.jpg",
    },
    {
      quote:
        "Expert in treating eye conditions and performing surgeries such as cataract removal, glaucoma management, and vision correction.",
      name: "Dr. Wilson",
      designation: "Ophthalmologist",
      src: "./public/1.jpg",
    },
    {
      quote:
        "Focuses on female reproductive health, offering care for pregnancy, menstruation, menopause, and conditions like PCOS.",
      name: "Dr. Garcia",
      designation: "Gynecologist",
      src: "./public/girl1.webp",
    },
    {
      quote:
        "Specializes in diagnosing and treating heart-related conditions, including heart disease, hypertension, and cardiac surgery.",
      name: "Dr. Smith",
      designation: "Cardiologist",
      src: "./public/1.jpg",
    },
    {
      quote:
        "Focuses on treating skin, hair, and nail conditions such as acne, eczema, psoriasis, and skin cancer.",
      name: "Dr. Johnson",
      designation: "Dermatologist",
      src: "./public/12.jpg",
    },
  ];

  return <AnimatedTestimonials testimonials={testimonials} />;
}
