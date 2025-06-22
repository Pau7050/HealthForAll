async function consultarIA() {
  const region = document.getElementById("region").value;
  const especialidad = document.getElementById("especialidad").value;
  const entrada = document.getElementById("entrada").value;
  const respuestaDiv = document.getElementById("respuesta");

  const apiKey = "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";  // ← Pega aquí tu clave de OpenAI

  const prompt = `Soy un paciente en la región ${region} buscando atención en ${especialidad}. ${entrada}`;

  const datos = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "Eres un asistente de salud para el Perú, especializado en ayudar a pacientes a navegar el sistema sanitario." },
      { role: "user", content: prompt }
    ]
  };

  respuestaDiv.innerText = "Consultando a la IA...";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify(datos)
    });

    const json = await response.json();
    const salida = json.choices[0].message.content;
    respuestaDiv.innerText = salida;
  } catch (error) {
    console.error(error);
    respuestaDiv.innerText = "Ocurrió un error al conectar con la IA.";
  }
}
