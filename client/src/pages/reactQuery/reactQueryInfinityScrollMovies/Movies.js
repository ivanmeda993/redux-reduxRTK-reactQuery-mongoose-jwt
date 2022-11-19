import React from "react";
import Row from "./Row";

const Movies = () => {
  return (
    <div className="relative h-full bg-gradient-to-b pt-12 ">
      <main className="relative px-4 pb-24 lg:space-y-24 lg:px-16  ">
        <section className="md:space-y-24">
          <Row />
        </section>
      </main>
    </div>
  );
};

export default Movies;
