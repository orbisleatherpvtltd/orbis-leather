import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardDescription, CardTitle } from "@/components/ui/card";

export type Certification = {
  name: string;
  issuer?: string;
  status?: "verified" | "pending";
};

export function CertificationCard({ certification }: { certification: Certification }) {
  const status = certification.status ?? "pending";
  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between gap-4">
          <CardTitle>{certification.name}</CardTitle>
          <Badge variant={status === "verified" ? "leather" : "outline"} className="shrink-0">
            {status === "verified" ? "Verified" : "Pending Verification"}
          </Badge>
        </div>
        <CardDescription>
          {certification.issuer
            ? `Issued by ${certification.issuer}.`
            : "Issuer and documentation to be published once verification is complete."}
        </CardDescription>
      </CardBody>
    </Card>
  );
}

export function CertificationEmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50/60 p-8 text-center sm:p-12">
      <p className="text-body text-ink/60">
        Certification documentation is currently being compiled and will be published here
        once verified. We do not list certifications that have not been confirmed.
      </p>
    </div>
  );
}
