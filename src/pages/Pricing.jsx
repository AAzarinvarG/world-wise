import PageNav from "../../components/PageNav";
import styles from "./Pricing.module.css";

export default function Pricing() {
  return (
    <>
      <PageNav />
      <section className={styles.pricingSection}>
        <div className={styles.content}>
          <div>
            <h1>
              Simple pricing.
              <br />
              Just $9/month.
            </h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae
              vel labore mollitia iusto. Recusandae quos provident, laboriosam
              fugit voluptatem iste.
            </p>
          </div>
          <img src="../../public/img-2.jpg" alt="city-photo" />
        </div>
      </section>
    </>
  );
}
