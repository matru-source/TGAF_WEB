import ProductForm from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default function NewProductPage() {
  return (
    <>
      <div className="admin-head">
        <div>
          <h1>New product</h1>
          <p>Add a consumer or bulk product to the catalogue.</p>
        </div>
      </div>
      <div className="panel" style={{ padding: "clamp(20px,3vw,34px)" }}>
        <ProductForm />
      </div>
    </>
  );
}
