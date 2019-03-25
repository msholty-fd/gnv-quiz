const activeQuestion = document.getElementById("activeQuestion");
const answers = document.getElementById("answers");

async function getQuestions() {
  const response = await fetch("/questions");
  const json = await response.json();
  const question = json[0];
  activeQuestion.innerHTML = question.question;
  for (var index in question.answers) {
    const answer = question.answers[index];
    const input = document.createElement("input");
    const li = document.createElement("li");
    const label = document.createElement("label");
    input.type = "radio";
    input.name = "answers";
    input.value = answer.text;
    input.id = `answer_${index}`;
    label.innerHTML = answer.text;
    label.setAttribute("for", input.id);
    li.appendChild(input);
    li.appendChild(label);
    answers.appendChild(li);
  }
}
