import InputFormCadastro from "../InputFormCadastro/InputFormCadastro"
import "./CadastroBody.css"
function CadastroBody() {

  return (
    <>
      <section id="body-cadastro">
        <div id="form-cadastro">
          <h1>Crie sua conta</h1>
          <p>Preencha seus dados e aproveite  as melhores ofertas em eletrônicos</p>
          <div id="divisor">
            <h1>DADOS PESSOAIS</h1>
            <hr />
          </div>
          <div id="input-nome">
            <InputFormCadastro
              label="Nome completo"
              placeholder="Digite seu nome completo"
              type="text"
              style={{ width: "54vw" }}
            />
          </div>
          <div id="dados-pessoais-inputs">
            <div className="dados-pessoais-inputs-box" >
              <InputFormCadastro
                label="CPF"
                placeholder="000.000.000-00"
                type="text"
                style={{ width: "15vw" }}
              />
            </div>
            <div className="dados-pessoais-inputs-box">
              <InputFormCadastro
                label="Data de nascimento"
                placeholder="dd/mm/yyyy"
                type="text"
                style={{ width: "15vw" }}
              />
            </div>
            <div className="dados-pessoais-inputs-box">
              <InputFormCadastro
                label="Telefone/Whatsapp"
                placeholder="(00)90000.0000"
                type="text"
                style={{ width: "15vw" }}
              />
            </div>
          </div>

          <div id="divisor">
            <h1>ENDEREÇO</h1>
            <hr />
          </div>

          <div id="dados-pessoais-inputs">
            <div className="dados-pessoais-inputs-box" >
              <InputFormCadastro
                label="CEP"
                placeholder="00000-000"
                type="text"
                style={{ width: "15vw" }}
              />
            </div>
            <div className="dados-pessoais-inputs-box">
              <InputFormCadastro
                label="Cidade"
                placeholder="Sua cidade"
                type="text"
                style={{ width: "15vw" }}
              />
            </div>
            <div className="dados-pessoais-inputs-box">
              <InputFormCadastro
                label="Estado"
                placeholder="UF"
                type="text"
                style={{ width: "15vw" }}
              />
            </div>
          </div>
          <div id="divisor">
            <h1>DADOS DE ACESSO</h1>
            <hr />
          </div>
          <div id="dados-pessoais-inputs" className="input-block">
            <div className="dados-pessoais-inputs-box" >
              <InputFormCadastro
                label="Email"
                placeholder="seuemail@gmail.com"
                type="text"
                style={{ width: "20vw" }}
              />
            </div>
            <div className="dados-pessoais-inputs-box">
              <InputFormCadastro
                label="Usuario"
                placeholder="Digite seu usuario"
                type="text"
                style={{ width: "20vw" }}
              />
            </div>
          </div>
          <div id="dados-pessoais-inputs" className="input-block">
            <div className="dados-pessoais-inputs-box" >
              <InputFormCadastro
                label="Senha"
                placeholder="Minimo 6 caracteres"
                type="text"
                style={{ width: "20vw" }}
              />
            </div>
            <div className="dados-pessoais-inputs-box">
              <InputFormCadastro
                label="Confirmar senha"
                placeholder="Repita a senha"
                type="text"
                style={{ width: "20vw" }}
              />
            </div>
          </div>
          <div id="dados-pessoais-button">
            <button>Acessar</button>
          </div>
        </div>

      </section>
    </>
  )
}

export default CadastroBody
