import { NavBar } from "@/components/willswalks/NavBar";
import { Footer } from "@/components/willswalks/Footer";

/**
 * DogBreedsPage provides educational information on small, medium and large dog breeds.
 * Each section lists examples, typical characteristics and exercise recommendations.
 */
export default function DogBreedsPage() {
  return (
    <>
      <NavBar />
      <main className="ww-page">
        <section className="ww-container space-y-16">
          <h1 className="font-serif text-4xl font-bold text-ww-deep-green">
            Dog Breed Guide
          </h1>
          {/* Small breeds */}
          <div>
            <h2 className="font-serif text-3xl font-semibold text-ww-deep-green mb-2">
              Small Breeds
            </h2>
            <p className="text-ww-text mb-3">
              Typical examples include Chihuahua, Pomeranian and Dachshund.
              These compact companions are lively and alert — perfect for urban living — but they still need regular exercise.
            </p>
            <ul className="list-disc pl-6 text-ww-text">
              <li>Characteristics: small size, often vocal, affectionate</li>
              <li>Exercise: daily walks of 20–30 minutes plus playtime</li>
            </ul>
          </div>
          {/* Medium breeds */}
          <div>
            <h2 className="font-serif text-3xl font-semibold text-ww-deep-green mb-2">
              Medium Breeds
            </h2>
            <p className="text-ww-text mb-3">
              Popular medium-sized dogs include the Beagle, Border Collie and Cocker Spaniel. They are energetic, intelligent and make great family pets.
            </p>
            <ul className="list-disc pl-6 text-ww-text">
              <li>Characteristics: athletic, intelligent, eager to please</li>
              <li>Exercise: 45–60 minute walks plus mental stimulation (puzzle toys, fetch)</li>
            </ul>
          </div>
          {/* Large breeds */}
          <div>
            <h2 className="font-serif text-3xl font-semibold text-ww-deep-green mb-2">
              Large Breeds
            </h2>
            <p className="text-ww-text mb-3">
              Large dogs like the Labrador Retriever, German Shepherd and Great Dane are known for their strength and gentle nature.
              They require more space and consistent training.
            </p>
            <ul className="list-disc pl-6 text-ww-text">
              <li>Characteristics: strong, loyal, often work or service breeds</li>
              <li>Exercise: 60–90 minute walks and varied activities (swimming, hiking)</li>
              <li>Note: avoid high-impact running for very young or senior dogs to protect joints</li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
