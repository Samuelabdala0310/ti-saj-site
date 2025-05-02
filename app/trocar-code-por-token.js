const axios = require("axios");

// Substitua pelos seus dados reais
const client_id = "5970";
const client_secret = "EhT9R7RVwTAIXRDcLig3Vrep6AjCLTXoF2XSa2k6";
const redirect_uri = "https://sandbox.ti-saj-site.vercel.app/melhorenvio/callback";
const code = "def50200a9e06a236ffecaee3a70e7d05ba2c64eaa75fee0a4768e8318762c10cb8da2b13ea04f1244b10cb60483a62d2d6c5758871db9550789fdc0cb897d1198bb74c08cc91f0244287b209865ea446c940824861b15c79f2e90e81027d7bf2efbaad588f13c84619ca8008a2bd434e7c849d9ad9ef7b511912909f57bd3734d1422873562a95e6ff9b5bed0019e2ae18601193f9c858275a09d1b7de24d0dd6c82df8c5edb54bcb38d2c55862c105fe54770758783bc7babec334cc00380b5f5f7dec695f7e6191fb9ceb2b7cb2e6b20f2b3104a03445e81505f6127cf99e4f486a663716c3ca60729110207851f409e3085fcb5b8d44e73ab92bf8bc8ad16342b2f70b0ab308b23fe56e02c9e0b3018579abfe8b6a366586c1356278cb8d3ce47403d0ff7c33e4aeefbb77c409d94f993a7de7e6a8da9386a6b77edc91db55d375e63f6b70786a7b4c716e35f9adff92f0f808b6e37de05f3cd5d3906bf1d6926a36f7bc6d17e67947cdd35c543b83bc50985ebe9ceba6a45ba9a082289b2cf1ca2c3f947dbdbd40fc5b49e060de4c7048bede27278337f6a7b2cbbaaf7d800a36cd"
async function trocarCodePorToken() {
  try {
    const response = await axios.post(
      "https://sandbox.melhorenvio.com.br/oauth/token",
      {
        grant_type: "authorization_code",
        client_id,
        client_secret,
        redirect_uri,
        code,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    console.log("✅ Token de acesso:");
    console.log(response.data);
  } catch (error) {
    console.error("❌ Erro ao trocar code por token:");
    console.error(error.response?.data || error.message);
  }
}

trocarCodePorToken();