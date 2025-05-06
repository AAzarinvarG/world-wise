import PageNav from "../../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <>
      <PageNav />
      <section className={styles.productSection}>
        <div className={styles.content}>
          <img src="../../public/img-1.jpg" alt="boy-photo" />
          <div>
            <h1>About WorldWide.</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
              dicta illum vero culpa cum quaerat architecto sapiente eius non
              soluta, molestiae nihil laborum, placeat debitis, laboriosam at
              fuga perspiciatis?
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
              doloribus libero sunt expedita ratione iusto, magni, id sapiente
              sequi officiis et.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
