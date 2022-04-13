import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

/* eslint-disable @next/next/no-img-element */

import React from "react";

import Link from "next/link";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

function Home({ popular }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Recipes - SSR</title>
      </Head>

      <div>
        {popular.map((recipe) => (
          <div key={recipe.id} className={styles.card}>
            <Link href={`/recipes/${recipe.id}`}>
              <a>
                <img src={recipe.image} alt={recipe.title} />
                <h3> {recipe.title}</h3>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=4`
  );
  const data = await response.json();
  const popular = data.recipes;

  return { props: { popular } };
}

export default Home;
