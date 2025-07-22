// preguntas
const Q = [
 'Prefiero hacer un mapa que explicarle a alguien cómo tiene que llegar.',
 'Si estoy enojado(a) o contento(a) generalmente sé exactamente por qué.',
 'Sé tocar (o antes sabía tocar) un instrumento musical.',
 'Asocio la música con mis estados de ánimo.',
 'Puedo sumar o multiplicar mentalmente con mucha rapidez.',
 'Puedo ayudar a un amigo a manejar sus sentimientos porque yo lo pude hacer antes.',
 'Me gusta trabajar con calculadoras y computadoras.',
 'Aprendo rápido a bailar un ritmo nuevo.',
 'No me es difícil decir lo que pienso en un debate.',
 'Disfruto de una buena charla, discurso o sermón.',
 'Siempre distingo el norte del sur, esté donde esté.',
 'Me gusta reunir grupos de personas en una fiesta.',
 'La vida me parece vacía sin música.',
 'Siempre entiendo los gráficos de instrucciones.',
 'Me gusta hacer rompecabezas y juegos electrónicos.',
 'Me fue fácil aprender a andar en bicicleta.',
 'Me enojo cuando oigo una afirmación que parece ilógica.',
 'Soy capaz de convencer a otros que sigan mis planes.',
 'Tengo buen sentido de equilibrio y coordinación.',
 'Con frecuencia veo configuraciones y relaciones entre números rápidamente.',
 'Me gusta construir modelos o esculturas.',
 'Tengo agudeza para encontrar el significado de las palabras.',
 'Puedo mirar un objeto de una manera y con la misma facilidad verlo de otra.',
 'Con frecuencia conecto una pieza de música con un evento de mi vida.',
 'Me gusta trabajar con números y figuras.',
 'Me gusta sentarme silenciosamente y reflexionar sobre mis sentimientos.',
 'Con sólo mirar la forma de construcciones me siento a gusto.',
 'Me gusta tararear, silbar y cantar en la ducha.',
 'Soy bueno(a) para el atletismo.',
 'Me gusta escribir cartas detalladas a mis amigos.',
 'Generalmente me doy cuenta de la expresión que tengo en la cara.',
 'Me doy cuenta de las expresiones en la cara de otras personas.',
 'Me mantengo en contacto con mis estados de ánimo.',
 'Me doy cuenta de los estados de ánimo de otros.',
 'Me doy cuenta bastante bien de lo que otros piensan de mí.'
];

// mapa pregunta->columna
const MAP = {
 1:'C',2:'F',3:'E',4:'E',5:'B',6:'F',7:'B',8:'D',9:'A',10:'A',
 11:'C',12:'G',13:'E',14:'C',15:'B',16:'D',17:'A',18:'G',19:'D',20:'B',
 21:'D',22:'A',23:'C',24:'E',25:'B',26:'F',27:'C',28:'E',29:'D',30:'A',
 31:'F',32:'G',33:'F',34:'G',35:'G'
};

// inteligencias
const INTEL = {
 A:'int. verbal',
 B:'int. lógico-matemática',
 C:'int. visual espacial',
 D:'int. kinestesica-corporal',
 E:'int. musical-rítmica',
 F:'int. intrapersonal',
 G:'int. interpersonal'
};

let nombre='';
let step=0;                    
const ans=new Array(35).fill(null);
const app=document.getElementById('app');

renderStart();
function renderStart(){
  app.innerHTML=`
    <h1>Test de Inteligencias Múltiples</h1>
    <input id="nombre" type="text" placeholder="Nombre y apellidos">
    <button class="btn" id="start" disabled>comenzar</button>
  `;
  const input=document.getElementById('nombre');
  input.addEventListener('input',()=>{document.getElementById('start').disabled=!input.value.trim();});
  document.getElementById('start').addEventListener('click',()=>{
    nombre=input.value.trim();
    step=1;
    renderQuestion();
  });
}

function renderQuestion(){
  const idx=step-1;
  app.innerHTML=`
    <p class="progress">${step}/35</p>
    <p class="question">${Q[idx]}</p>
    <div class="vf">
      <button class="btn btn-v" id="v">V</button>
      <button class="btn btn-f" id="f">F</button>
    </div>
    ${step>1?'<button class="link-btn" id="back">anterior</button>':''}
  `;
  document.getElementById('v').onclick=()=>next(1);
  document.getElementById('f').onclick=()=>next(0);
  if(step>1) document.getElementById('back').onclick=()=>{step--;renderQuestion();}
}

function renderResults(){
  const scores={};               
  ans.forEach((v,i)=>{if(v===1){const col=MAP[i+1];scores[col]=(scores[col]||0)+1;}});
  app.innerHTML=`
    <h1>Resultados de ${nombre}</h1>
    <div class="results">
      ${Object.entries(INTEL).map(([k,label])=>{
        const s=scores[k]||0;
        const status=s===5?'habilidad sobresaliente':s===4?'habilidad marcada':'';
        return `
          <div class="card">
            <p>${label}</p>
            <p class="score">${s}</p>
            ${status?`<p class="status">${status}</p>`:''}
          </div>`;
      }).join('')}
    </div>
    <button class="btn" id="reset">reiniciar</button>
  `;
  document.getElementById('reset').onclick=()=>{location.reload();}
}

function next(val){
  ans[step-1]=val;
  if(step<35){step++;renderQuestion();}
  else{renderResults();}
}