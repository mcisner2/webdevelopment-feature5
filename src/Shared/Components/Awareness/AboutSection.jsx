// AboutSection.jsx
// "About" content for the Awareness page. It is a self-contained section, so
// it can sit above the resources list once Marcos's Awareness page and this
// content are merged onto one page.

export default function AboutSection() {
  return (
    <section aria-labelledby="about-heading">
      <h2 id="about-heading">About this site</h2>
      <p>
        ASL Awareness is a class project built by Elijah Jones and Marcos
        Cisneros. It is a starting point for learning about American Sign
        Language (ASL) and Deaf culture, not a replacement for learning from
        Deaf teachers and community members.
      </p>

      <h3>What you can do here</h3>
      <ul>
        <li>Browse the ASL alphabet signs and filter them by letter.</li>
        <li>Read a timeline of Deaf and ASL history.</li>
        <li>Find organizations, learning resources, and ways to help.</li>
        <li>Create an account and manage your profile.</li>
        {/* TODO: add the quiz, mark-as-learned, and progress tracking here
            once those features ship */}
      </ul>

      <h3>About ASL</h3>
      <p>
        ASL is a complete language with its own grammar and structure. It is
        not English on the hands, and it is not a universal language: other
        countries have their own sign languages. Facial expressions and head
        movements are part of the grammar, for example when marking a
        question.
      </p>

      <h3>About Deaf culture</h3>
      <p>
        "Deaf" with a capital D usually refers to a cultural and linguistic
        community, while lowercase "deaf" often describes hearing status. Many
        Deaf people see Deafness as an identity and a culture, not something
        to fix.
      </p>

      <h3>About the sign images</h3>
      <p>
        The alphabet images come from the Sign Language MNIST dataset on
        Kaggle (datamunge): small 28x28 grayscale images of hand shapes. The
        letters J and Z are not included because they require motion.
      </p>
    </section>
  );
}