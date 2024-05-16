import { useState } from "react";

function App() {
  const [submitList, setSubmitList] = useState([]);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setPending(true);
    const submitListResponse = await fetch(
      `${import.meta.env.VITE_CANISTER_URL}/greet`,
      {
        method: "POST",
      }
    );

    setSubmitList(await submitListResponse.json());
    setPending(false);
  }

  return (
    <main>
      <form action="#" onSubmit={handleSubmit}>
        <button type="submit">조회하기</button>
      </form>
      <section>
        {pending ? "조회중..." : null}
        {submitList.map((submit) => (
          <article
            key={submit.createAt + submit.nick}
            style={{ border: "1px solid", padding: "15px", margin: "10px 0" }}
          >
            <h3>닉네임: {submit.nick}</h3>
            <h4>
              미션 제출 상태:{" "}
              {submit.status === "APPROVE" ? "승인됨" : "제출됨"}
            </h4>
            <h5>제출 일시: {submit.createAt}</h5>
            <code>제출 내용: {submit.description}</code>
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;
