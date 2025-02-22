import{J as I,I as E,bb as J,r as l,j as e,z as b,ad as d,U as F,bc as D,bq as Y,L,K as f}from"./index-D3ojX_Fy.js";import{p as q}from"./index-C0GkpkSG.js";const G=()=>{const{currentUser:t}=I(),m=E(),{id:c}=J(),[s,y]=l.useState(null),[g,r]=l.useState(!0),[p,o]=l.useState(""),[x,v]=l.useState(null),[n,w]=l.useState({applicantMessage:"",attachments:null,additionalInfo:""}),[u,A]=l.useState(""),[N,h]=l.useState("");l.useEffect(()=>{if(!t){alert("Please login to apply for jobs."),m("/login");return}(async()=>{if(!c){o("No job ID specified."),r(!1);return}try{r(!0),o("");const i=await D.fetchJobById(c);y(i)}catch(i){o(i.message||"Failed to fetch job details.")}finally{r(!1)}})()},[c,t,m]);const j=a=>{const{name:i,value:M,files:k}=a.target;w(C=>({...C,[i]:k||M}))},_=()=>{const a=document.getElementById("confirmModal");if(!a)return;const i=new Y(a);v(i),i.show()},S=async()=>{x==null||x.hide(),h(""),A("");try{const a=new FormData;a.append("job_id",c||""),a.append("applicant_message",n.applicantMessage),a.append("additional_info",n.additionalInfo),n.attachments&&Array.from(n.attachments).forEach(i=>{a.append("attachments[]",i)}),r(!0);try{await L("job-apply",a),f.success("Job application submitted successfully"),m("/admin/my-job-applications")}catch(i){h("Failed: "+i),f.error(i+"")}finally{r(!1)}}catch(a){h((a==null?void 0:a.message)||"An error occurred while submitting.")}};return g?e.jsxs("div",{className:"container py-5 text-center",children:[e.jsx("div",{className:"spinner-border text-primary",role:"status"}),e.jsx("p",{className:"mt-3",children:"Loading job details..."})]}):p?e.jsx("div",{className:"container py-5",children:e.jsx("div",{className:"alert alert-danger text-center",children:p})}):e.jsxs(b.div,{className:"container py-4 px-2 px-lg-10",initial:{opacity:0,y:40},animate:{opacity:1,y:0},children:[e.jsxs("ol",{className:"breadcrumb breadcrumb-item text-muted fs-6 fw-bold mb-5 mx-3",children:[e.jsx("li",{className:"breadcrumb-item pe-3",children:e.jsx(d,{to:"/",className:"active text-decoration-none",children:"Home"})}),e.jsx("li",{className:"breadcrumb-item pe-3",children:e.jsx(d,{to:"/jobs",className:"active text-decoration-none",children:"Jobs"})}),e.jsx("li",{className:"breadcrumb-item pe-0",children:e.jsx(d,{to:`/jobs/${c}`,className:"active text-decoration-none",children:s==null?void 0:s.title})}),e.jsx("li",{className:"breadcrumb-item px-3 text-muted",children:"Apply"})]}),e.jsxs("div",{className:"row gy-4",children:[e.jsx("div",{className:"col-md-8",children:e.jsxs("div",{className:"card shadow-sm border-0",children:[e.jsx("div",{className:"card-header bg-primary text-white",children:e.jsx("h2",{className:"mb-0 fs-1 pt-6 text-white",children:"Online - Job application form"})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"alert alert-warning alert-dismissible fade show mt-0",role:"alert",children:[e.jsx("i",{className:"bi bi-exclamation-triangle-fill me-2"}),"Make sure your profile is well updated before submitting.",e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"alert","aria-label":"Close"})]}),u&&e.jsx("div",{className:"alert alert-success",children:u}),N&&e.jsx("div",{className:"alert alert-danger",children:N}),e.jsx("p",{children:"You are applying for this job as:"}),e.jsx("div",{className:"card border border-2 border-primary",children:e.jsxs("div",{className:"card-body py-3 px-3",children:[e.jsxs("div",{className:"d-flex mb-2 align-items-center",children:[e.jsx("div",{className:"symbol symbol-60px me-5",children:e.jsx("img",{src:F.img((t==null?void 0:t.avatar)||""),alt:"Applicant"})}),e.jsxs("div",{className:"flex-grow-1",children:[e.jsx("div",{className:"text-gray-900 fw-bold fs-6",children:t==null?void 0:t.name}),e.jsx("span",{className:"text-muted d-block fw-semibold",children:t==null?void 0:t.phone_number_1}),e.jsx("span",{className:"text-muted d-block fw-semibold",children:t==null?void 0:t.email})]})]}),e.jsx("div",{className:"d-flex align-items-center mt-3",children:e.jsxs(d,{to:"/admin/profile-edit/photo",target:"_blank",className:"btn btn-link d-flex align-items-center",children:[e.jsx("i",{className:"bi bi-pencil-square me-2"}),e.jsx("span",{children:"Update My CV"})]})})]})}),e.jsx("hr",{className:"mt-10"}),e.jsxs("form",{children:[e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label fw-bold mt-3",children:"Add Attachments"}),e.jsx("input",{type:"file",name:"attachments",multiple:!0,className:"form-control",onChange:j}),e.jsx("small",{className:"text-muted",children:"Upload any relevant documents as needed."})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label fw-bold",children:"Your Message"}),e.jsx("textarea",{className:"form-control",name:"applicantMessage",rows:5,onChange:j})]}),e.jsx("button",{type:"button",className:"btn btn-primary",onClick:_,children:"Submit Application"})]})]})]})}),e.jsxs("div",{className:"col-md-4",children:[e.jsxs(b.div,{className:"bg-white p-4 rounded shadow-sm mb-4",initial:{opacity:0,y:10},animate:{opacity:1,y:0},children:[e.jsx("h6",{className:"fw-bold mb-3",children:"Job Details"}),e.jsxs("ul",{className:"list-unstyled mb-0",children:[e.jsxs("li",{className:"mb-2",children:[e.jsx("i",{className:"bi bi-building me-2 text-muted"}),e.jsx("strong",{children:"Category: "}),(s==null?void 0:s.category_id)||"N/A"]}),e.jsxs("li",{className:"mb-2",children:[e.jsx("i",{className:"bi bi-briefcase me-2 text-muted"}),e.jsx("strong",{children:"Employment Type: "}),(s==null?void 0:s.employment_status)||"N/A"]}),e.jsxs("li",{className:"mb-2",children:[e.jsx("i",{className:"bi bi-laptop me-2 text-muted"}),e.jsx("strong",{children:"Workplace: "}),(s==null?void 0:s.workplace)||"N/A"]}),e.jsxs("li",{className:"mb-2",children:[e.jsx("i",{className:"bi bi-cash-stack me-2 text-muted"}),e.jsx("strong",{children:"Salary: "}),(s==null?void 0:s.show_salary)==="Yes"?e.jsxs(e.Fragment,{children:["UGX ",new Intl.NumberFormat().format(s==null?void 0:s.minimum_salary)," -"," ",new Intl.NumberFormat().format(s==null?void 0:s.maximum_salary)]}):"Hidden"]}),e.jsxs("li",{className:"mb-2",children:[e.jsx("i",{className:"bi bi-bar-chart-line me-2 text-muted"}),e.jsx("strong",{children:"Experience: "}),(s==null?void 0:s.experience_period)||"Not specified"]}),e.jsxs("li",{className:"mb-2",children:[e.jsx("i",{className:"bi bi-mortarboard-fill me-2 text-muted"}),e.jsx("strong",{children:"Min. Qualification: "}),(s==null?void 0:s.minimum_academic_qualification)||"N/A"]}),e.jsxs("li",{className:"mb-2",children:[e.jsx("i",{className:"bi bi-person-fill me-2 text-muted"}),e.jsx("strong",{children:"Gender: "}),(s==null?void 0:s.gender)||"N/A"]}),e.jsxs("li",{className:"mb-2",children:[e.jsx("i",{className:"bi bi-people-fill me-2 text-muted"}),e.jsx("strong",{children:"Vacancies: "}),(s==null?void 0:s.vacancies_count)||1]}),e.jsxs("li",{className:"mb-2",children:[e.jsx("i",{className:"bi bi-card-list me-2 text-muted"}),e.jsx("strong",{children:"Status: "}),s==null?void 0:s.status]})]})]}),e.jsxs(b.div,{className:"bg-white p-4 rounded shadow-sm mb-4",initial:{opacity:0,y:10},animate:{opacity:1,y:0},children:[e.jsx("h6",{className:"fw-bold mb-3",children:"Application Instructions"}),e.jsx("p",{className:"text-muted",children:q((s==null?void 0:s.application_method_details)||"N/A")}),e.jsx("hr",{}),e.jsx("p",{children:"Skills.ug will not be responsible for any financial transactions or fraud by the company after applying through the website. This platform only connects companies and job seekers."})]})]})]}),e.jsx("div",{className:"modal fade",id:"confirmModal",tabIndex:-1,"aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-lg",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header bg-primary text-white",children:[e.jsx("h5",{className:"modal-title text-white",children:"Confirm Your Application"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Your Message:"})," ",n.applicantMessage||"Not provided"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Additional Info:"})," ",n.additionalInfo||"Not provided"]})]}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("button",{className:"btn btn-secondary","data-bs-dismiss":"modal",children:"Edit"}),e.jsx("button",{className:"btn btn-primary",onClick:S,children:"Confirm & Submit"})]})]})})})]})};export{G as default};
