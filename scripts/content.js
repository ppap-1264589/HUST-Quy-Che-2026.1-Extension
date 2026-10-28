function normalizeText(value){
  return String(value||"").replace(/\u00a0/g," ").replace(/^\s*\d+\s*[.)、-]\s*/,"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d").replace(/Đ/g,"D").toLowerCase().replace(/[^\p{L}\p{N}]+/gu," ").trim().replace(/\s+/g," ");
}
function clickAnswer(root,answer){
  const wanted=normalizeText(answer); if(!wanted)return false;
  const inputs=[...root.querySelectorAll('input[type="radio"],input[type="checkbox"],input[value]')];
  for(const input of inputs){
    const label=(input.id&&document.querySelector(`label[for="${CSS.escape(input.id)}"]`))||input.closest("label")||input.parentElement;
    const candidates=[normalizeText(input.value),normalizeText(label?.innerText)];
    if(candidates.includes(wanted)){if(!input.checked)input.click();return true;}
  }
  for(const node of root.querySelectorAll('label,[role="radio"],[role="checkbox"]')){
    const text=normalizeText(node.innerText);
    if(text===wanted || (wanted.length>=10 && text.includes(wanted))){node.click();return true;}
  }
  return false;
}
function fillForm(){
  const roots=[...document.querySelectorAll('div[data-automation-id="questionItem"]')];
  const seen=new Set(),matched=[],failed=[],unknown=[];
  for(const root of roots){
    const title=root.querySelector(".text-format-content");
    const question=title?.innerText?.trim(); if(!question)continue;
    const key=normalizeText(question);if(seen.has(key))continue;seen.add(key);
    const answer=Object.entries(ANSWER_KEY).find(([q])=>normalizeText(q)===key)?.[1];
    if(!answer){unknown.push(question);continue;}
    if(clickAnswer(root,answer))matched.push(question);else failed.push(question);
  }
  return {status:matched.length?"ok":"partial",bankSize:Object.keys(ANSWER_KEY).length,questionsOnPage:seen.size,matchedCount:matched.length,failedCount:failed.length,unknownCount:unknown.length};
}
chrome.runtime.onMessage.addListener((message,_sender,sendResponse)=>{
  if(message.action!=="fillForm")return false;
  try{sendResponse(fillForm());}catch(error){sendResponse({status:"error",bankSize:Object.keys(ANSWER_KEY).length,questionsOnPage:0,matchedCount:0,failedCount:0,unknownCount:0,message:String(error)});}
  return false;
});
