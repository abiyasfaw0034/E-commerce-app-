import NavBar from "../ui/NavBar";

function About() {
  return (
    <>
      <div className="grid h-screen overflow-hidden  grid-rows-[auto,1fr]">
        <div>
          <NavBar />
        </div>
        <div className="overflow-scroll">
          <main className="mx-auto h-full">
            <div className=" p-20 text-center">
              <h2 className="text-3xl font-bold  my-8">About Us</h2>
              <p className="text-2xl text-gray-700 dark:text-gray-300">
                Welcome to our online shopping destination! We are dedicated to
                bringing you the best products at unbeatable prices. Our
                platform offers a seamless shopping experience with a wide range
                of high-quality items, secure payment options, and fast
                delivery. Whether you&apos;re looking for fashion, electronics,
                or home essentials, we&apos;ve got you covered. Shop with
                confidence and convenience!
              </p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default About;
