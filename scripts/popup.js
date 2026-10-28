const button=document.getElementById("fill");
const status=document.getElementById("status");
const completionLayer=document.getElementById("completionLayer");
const acknowledge=document.getElementById("acknowledge");
function closeNotice(){completionLayer.hidden=true;button.focus();}
acknowledge.addEventListener("click",closeNotice);
document.addEventListener("keydown",event=>{if(event.key==="Escape"&&!completionLayer.hidden)closeNotice();});
button.addEventListener("click",()=>{
  button.disabled=true; status.textContent="Đang tìm câu hỏi và chọn đáp án…";
  chrome.tabs.query({active:true,currentWindow:true},tabs=>{
    const tab=tabs[0];
    if(!tab?.id || !/^https:\/\/(forms\.office\.com|forms\.cloud\.microsoft)\//.test(tab.url||"")){
      status.textContent="Hãy mở bài kiểm tra trên Microsoft Forms rồi thử lại.";button.disabled=false;return;
    }
    chrome.tabs.sendMessage(tab.id,{action:"fillForm"},response=>{
      button.disabled=false;
      if(chrome.runtime.lastError){status.textContent="Không kết nối được với biểu mẫu. Hãy tải lại trang Forms rồi thử lại.";return;}
      if(!response){status.textContent="Không nhận được phản hồi từ biểu mẫu.";return;}
      const lines=[`Đã chọn: ${response.matchedCount}/${response.questionsOnPage} câu trên trang`,`Ngân hàng đáp án: ${response.bankSize} câu`];
      if(response.failedCount)lines.push(`Không chọn được: ${response.failedCount} câu`);
      if(response.unknownCount)lines.push(`Chưa có đáp án khớp: ${response.unknownCount} câu`);
      status.textContent=lines.join("\n");
      completionLayer.hidden=false;
      acknowledge.focus();
    });
  });
});
