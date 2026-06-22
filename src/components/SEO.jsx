import { Helmet } from "react-helmet-async";

export default function SEO({ title, description }) {
  const base = "IronPulse | Fitness & Gym Management";
  return (
    <Helmet>
      <title>{title ? `${title} | IronPulse` : base}</title>
      <meta name="description" content={description || "Discover fitness classes, book sessions, and join the IronPulse community."} />
    </Helmet>
  );
}
