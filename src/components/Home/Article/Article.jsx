import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./Article.css";

const Article = React.memo(function Article() {
  const { t, i18n } = useTranslation();

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }), []);

  const sections = useMemo(() => [
    {
      title: t("article.sections.naturalFlowers.title"),
      text: t("article.sections.naturalFlowers.text"),
    },
    {
      title: t("article.sections.arrangements.title"),
      text: t("article.sections.arrangements.text"),
    },
    {
      title: t("article.sections.gifts.title"),
      text: t("article.sections.gifts.text"),
    },
    {
      title: t("article.sections.events.title"),
      text: t("article.sections.events.text"),
    },
    {
      title: t("article.sections.location.title"),
      text: t("article.sections.location.text"),
      storeInfo: true,
    },
    {
      title: t("article.sections.whyUs.title"),
      text: t("article.sections.whyUs.text"),
    },
  ], [t]);

  return (
    <motion.article
      className="Article"
      initial="hidden"
      animate="visible"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      key={i18n.language}
    >
      <motion.header className="article-header" variants={containerVariants}>
        <h1>{t("article.header.title")}</h1>
        <p>{t("article.header.subtitle")}</p>
      </motion.header>

      {sections.map((section, i) => (
        <motion.section
          key={i}
          className="article-section"
          variants={containerVariants}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2>{section.title}</h2>
          <div>{section.text}</div>

          {section.storeInfo && (
            <motion.div
              className="store-info"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3>{t("article.storeInfo.title")}</h3>
              <ul>
                <li>{t("article.storeInfo.name")}</li>
                <li>{t("article.storeInfo.address")}</li>
                <li>{t("article.storeInfo.phone")}</li>
                <li>{t("article.storeInfo.hours")}</li>
                <li>{t("article.storeInfo.rating")}</li>
              </ul>
            </motion.div>
          )}
        </motion.section>
      ))}

      <motion.footer className="article-footer" variants={containerVariants}>
        <p>{t("article.footer.text")}</p>
      </motion.footer>
    </motion.article>
  );
});

export default Article;
