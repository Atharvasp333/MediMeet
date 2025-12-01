import { getDoctorById } from "@/actions/appointments";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/page-header";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const { doctor } = await getDoctorById(id);
    if (!doctor) {
      return {
        title: "Doctor Not Found - MediMeet",
        description: "The requested doctor profile could not be found.",
      };
    }
    return {
      title: `Dr. ${doctor.name} - MediMeet`,
      description: `Book an appointment with Dr. ${doctor.name}, ${doctor.specialty} specialist with ${doctor.experience} years of experience.`,
    };
  } catch (error) {
    return {
      title: "Doctor Not Found - MediMeet",
      description: "The requested doctor profile could not be found.",
    };
  }
}

export default async function DoctorProfileLayout({ children, params }) {
  const { id, speciality } = await params;
  
  try {
    const { doctor } = await getDoctorById(id);

    if (!doctor) {
      redirect("/doctors");
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          // icon={<Stethoscope />}
          title={"Dr. " + doctor.name}
          backLink={`/doctors/${speciality || doctor.specialty}`}
          backLabel={`Back to ${speciality || doctor.specialty}`}
        />

        {children}
      </div>
    );
  } catch (error) {
    redirect("/doctors");
  }
}