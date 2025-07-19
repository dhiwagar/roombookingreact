"use strict";exports.id=511,exports.ids=[511],exports.modules={7149:(e,t,n)=>{n.d(t,{h:()=>E,X:()=>S});var r=Object.defineProperty,i=Object.defineProperties,s=Object.getOwnPropertyDescriptors,a=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,d=Object.prototype.propertyIsEnumerable,l=(e,t,n)=>t in e?r(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,c=(e,t)=>{for(var n in t||(t={}))o.call(t,n)&&l(e,n,t[n]);if(a)for(var n of a(t))d.call(t,n)&&l(e,n,t[n]);return e},u=(e,t)=>i(e,s(t)),h=(e,t,n)=>new Promise((r,i)=>{var s=e=>{try{o(n.next(e))}catch(e){i(e)}},a=e=>{try{o(n.throw(e))}catch(e){i(e)}},o=e=>e.done?r(e.value):Promise.resolve(e.value).then(s,a);o((n=n.apply(e,t)).next())}),p=class{constructor(e){this.resend=e}create(e){return h(this,arguments,function*(e,t={}){return yield this.resend.post("/api-keys",e,t)})}list(){return h(this,null,function*(){return yield this.resend.get("/api-keys")})}remove(e){return h(this,null,function*(){return yield this.resend.delete(`/api-keys/${e}`)})}},m=class{constructor(e){this.resend=e}create(e){return h(this,arguments,function*(e,t={}){return yield this.resend.post("/audiences",e,t)})}list(){return h(this,null,function*(){return yield this.resend.get("/audiences")})}get(e){return h(this,null,function*(){return yield this.resend.get(`/audiences/${e}`)})}remove(e){return h(this,null,function*(){return yield this.resend.delete(`/audiences/${e}`)})}};function g(e){return{attachments:e.attachments,bcc:e.bcc,cc:e.cc,from:e.from,headers:e.headers,html:e.html,reply_to:e.replyTo,scheduled_at:e.scheduledAt,subject:e.subject,tags:e.tags,text:e.text,to:e.to}}var f=class{constructor(e){this.resend=e}send(e){return h(this,arguments,function*(e,t={}){return this.create(e,t)})}create(e){return h(this,arguments,function*(e,t={}){let r=[];for(let t of e){if(t.react){if(!this.renderAsync)try{let{renderAsync:e}=yield n.e(44).then(n.bind(n,2614));this.renderAsync=e}catch(e){throw Error("Failed to render React component. Make sure to install `@react-email/render`")}t.html=yield this.renderAsync(t.react),t.react=void 0}r.push(g(t))}return yield this.resend.post("/emails/batch",r,t)})}},y=class{constructor(e){this.resend=e}create(e){return h(this,arguments,function*(e,t={}){if(e.react){if(!this.renderAsync)try{let{renderAsync:e}=yield n.e(44).then(n.bind(n,2614));this.renderAsync=e}catch(e){throw Error("Failed to render React component. Make sure to install `@react-email/render`")}e.html=yield this.renderAsync(e.react)}return yield this.resend.post("/broadcasts",{name:e.name,audience_id:e.audienceId,preview_text:e.previewText,from:e.from,html:e.html,reply_to:e.replyTo,subject:e.subject,text:e.text},t)})}send(e,t){return h(this,null,function*(){return yield this.resend.post(`/broadcasts/${e}/send`,{scheduled_at:null==t?void 0:t.scheduledAt})})}list(){return h(this,null,function*(){return yield this.resend.get("/broadcasts")})}get(e){return h(this,null,function*(){return yield this.resend.get(`/broadcasts/${e}`)})}remove(e){return h(this,null,function*(){return yield this.resend.delete(`/broadcasts/${e}`)})}update(e,t){return h(this,null,function*(){return yield this.resend.patch(`/broadcasts/${e}`,{name:t.name,audience_id:t.audienceId,from:t.from,html:t.html,text:t.text,subject:t.subject,reply_to:t.replyTo,preview_text:t.previewText})})}},v=class{constructor(e){this.resend=e}create(e){return h(this,arguments,function*(e,t={}){return yield this.resend.post(`/audiences/${e.audienceId}/contacts`,{unsubscribed:e.unsubscribed,email:e.email,first_name:e.firstName,last_name:e.lastName},t)})}list(e){return h(this,null,function*(){return yield this.resend.get(`/audiences/${e.audienceId}/contacts`)})}get(e){return h(this,null,function*(){return e.id||e.email?yield this.resend.get(`/audiences/${e.audienceId}/contacts/${(null==e?void 0:e.email)?null==e?void 0:e.email:null==e?void 0:e.id}`):{data:null,error:{message:"Missing `id` or `email` field.",name:"missing_required_field"}}})}update(e){return h(this,null,function*(){return e.id||e.email?yield this.resend.patch(`/audiences/${e.audienceId}/contacts/${(null==e?void 0:e.email)?null==e?void 0:e.email:null==e?void 0:e.id}`,{unsubscribed:e.unsubscribed,first_name:e.firstName,last_name:e.lastName}):{data:null,error:{message:"Missing `id` or `email` field.",name:"missing_required_field"}}})}remove(e){return h(this,null,function*(){return e.id||e.email?yield this.resend.delete(`/audiences/${e.audienceId}/contacts/${(null==e?void 0:e.email)?null==e?void 0:e.email:null==e?void 0:e.id}`):{data:null,error:{message:"Missing `id` or `email` field.",name:"missing_required_field"}}})}},b=class{constructor(e){this.resend=e}create(e){return h(this,arguments,function*(e,t={}){return yield this.resend.post("/domains",{name:e.name,region:e.region,custom_return_path:e.customReturnPath},t)})}list(){return h(this,null,function*(){return yield this.resend.get("/domains")})}get(e){return h(this,null,function*(){return yield this.resend.get(`/domains/${e}`)})}update(e){return h(this,null,function*(){return yield this.resend.patch(`/domains/${e.id}`,{click_tracking:e.clickTracking,open_tracking:e.openTracking,tls:e.tls})})}remove(e){return h(this,null,function*(){return yield this.resend.delete(`/domains/${e}`)})}verify(e){return h(this,null,function*(){return yield this.resend.post(`/domains/${e}/verify`)})}},w=class{constructor(e){this.resend=e}send(e){return h(this,arguments,function*(e,t={}){return this.create(e,t)})}create(e){return h(this,arguments,function*(e,t={}){if(e.react){if(!this.renderAsync)try{let{renderAsync:e}=yield n.e(44).then(n.bind(n,2614));this.renderAsync=e}catch(e){throw Error("Failed to render React component. Make sure to install `@react-email/render`")}e.html=yield this.renderAsync(e.react)}return yield this.resend.post("/emails",g(e),t)})}get(e){return h(this,null,function*(){return yield this.resend.get(`/emails/${e}`)})}update(e){return h(this,null,function*(){return yield this.resend.patch(`/emails/${e.id}`,{scheduled_at:e.scheduledAt})})}cancel(e){return h(this,null,function*(){return yield this.resend.post(`/emails/${e}/cancel`)})}},x="undefined"!=typeof process&&process.env&&process.env.RESEND_BASE_URL||"https://api.resend.com",k="undefined"!=typeof process&&process.env&&process.env.RESEND_USER_AGENT||"resend-node:4.6.0";let $=new class{constructor(e){if(this.key=e,this.apiKeys=new p(this),this.audiences=new m(this),this.batch=new f(this),this.broadcasts=new y(this),this.contacts=new v(this),this.domains=new b(this),this.emails=new w(this),!e&&("undefined"!=typeof process&&process.env&&(this.key=process.env.RESEND_API_KEY),!this.key))throw Error('Missing API key. Pass it to the constructor `new Resend("re_123")`');this.headers=new Headers({Authorization:`Bearer ${this.key}`,"User-Agent":k,"Content-Type":"application/json"})}fetchRequest(e){return h(this,arguments,function*(e,t={}){try{let n=yield fetch(`${x}${e}`,t);if(!n.ok)try{let e=yield n.text();return{data:null,error:JSON.parse(e)}}catch(t){if(t instanceof SyntaxError)return{data:null,error:{name:"application_error",message:"Internal server error. We are unable to process your request right now, please try again later."}};let e={message:n.statusText,name:"application_error"};if(t instanceof Error)return{data:null,error:u(c({},e),{message:t.message})};return{data:null,error:e}}return{data:yield n.json(),error:null}}catch(e){return{data:null,error:{name:"application_error",message:"Unable to fetch data. The request could not be resolved."}}}})}post(e,t){return h(this,arguments,function*(e,t,n={}){let r=new Headers(this.headers);n.idempotencyKey&&r.set("Idempotency-Key",n.idempotencyKey);let i=c({method:"POST",headers:r,body:JSON.stringify(t)},n);return this.fetchRequest(e,i)})}get(e){return h(this,arguments,function*(e,t={}){let n=c({method:"GET",headers:this.headers},t);return this.fetchRequest(e,n)})}put(e,t){return h(this,arguments,function*(e,t,n={}){let r=c({method:"PUT",headers:this.headers,body:JSON.stringify(t)},n);return this.fetchRequest(e,r)})}patch(e,t){return h(this,arguments,function*(e,t,n={}){let r=c({method:"PATCH",headers:this.headers,body:JSON.stringify(t)},n);return this.fetchRequest(e,r)})}delete(e,t){return h(this,null,function*(){let n={method:"DELETE",headers:this.headers,body:JSON.stringify(t)};return this.fetchRequest(e,n)})}}(process.env.RESEND_API_KEY);async function E({booking:e,room:t}){if(!process.env.RESEND_API_KEY)return console.warn("RESEND_API_KEY not configured, skipping email"),{success:!1,error:"Email service not configured"};let n=new Date(e.checkInDate).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),r=new Date(e.checkOutDate).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),i=Math.ceil((new Date(e.checkOutDate).getTime()-new Date(e.checkInDate).getTime())/864e5),s=`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation - Villa Shanti</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #FF6B35, #F7931E); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
        .detail-row:last-child { border-bottom: none; }
        .total { background: #FF6B35; color: white; padding: 15px; border-radius: 8px; text-align: center; font-size: 18px; font-weight: bold; }
        .footer { text-align: center; margin-top: 30px; color: #666; }
        .button { display: inline-block; background: #FF6B35; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏨 Villa Shanti</h1>
          <h2>Booking Confirmation</h2>
          <p>Thank you for choosing Villa Shanti!</p>
        </div>
        
        <div class="content">
          <p>Dear ${e.name},</p>
          
          <p>We're delighted to confirm your reservation at Villa Shanti. Your booking details are below:</p>
          
          <div class="booking-details">
            <h3>Booking Details</h3>
            <div class="detail-row">
              <span><strong>Booking ID:</strong></span>
              <span>${e.bookingId}</span>
            </div>
            <div class="detail-row">
              <span><strong>Room:</strong></span>
              <span>${t.name}</span>
            </div>
            <div class="detail-row">
              <span><strong>Check-in:</strong></span>
              <span>${n}</span>
            </div>
            <div class="detail-row">
              <span><strong>Check-out:</strong></span>
              <span>${r}</span>
            </div>
            <div class="detail-row">
              <span><strong>Nights:</strong></span>
              <span>${i}</span>
            </div>
            <div class="detail-row">
              <span><strong>Guests:</strong></span>
              <span>${e.numberOfGuests}</span>
            </div>
            ${e.specialRequest?`
            <div class="detail-row">
              <span><strong>Special Request:</strong></span>
              <span>${e.specialRequest}</span>
            </div>
            `:""}
          </div>
          
          <div class="total">
            Total Amount: $${e.totalAmount}
          </div>
          
          <h3>What's Next?</h3>
          <ul>
            <li>You'll receive a payment link shortly to complete your reservation</li>
            <li>Check-in time: 3:00 PM</li>
            <li>Check-out time: 11:00 AM</li>
            <li>Free cancellation up to 24 hours before check-in</li>
          </ul>
          
          <h3>Contact Information</h3>
          <p>
            <strong>Villa Shanti</strong><br>
            14 Suffren Street, White Town<br>
            Puducherry, India 605001<br>
            Phone: +91 413 233 9999<br>
            Email: info@villashanti.com
          </p>
          
          <div class="footer">
            <p>We look forward to welcoming you to Villa Shanti!</p>
            <p><em>Experience luxury and tranquility in our heritage property</em></p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `,a=`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Booking - Villa Shanti</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2c3e50; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
        .detail-row:last-child { border-bottom: none; }
        .alert { background: #e74c3c; color: white; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏨 Villa Shanti - New Booking</h1>
          <p>Booking ID: ${e.bookingId}</p>
        </div>
        
        <div class="content">
          <div class="alert">
            <strong>Action Required:</strong> New booking received - Please review and confirm
          </div>
          
          <div class="booking-details">
            <h3>Guest Information</h3>
            <div class="detail-row">
              <span><strong>Name:</strong></span>
              <span>${e.name}</span>
            </div>
            <div class="detail-row">
              <span><strong>Email:</strong></span>
              <span>${e.email}</span>
            </div>
            <div class="detail-row">
              <span><strong>Phone:</strong></span>
              <span>${e.phone}</span>
            </div>
          </div>
          
          <div class="booking-details">
            <h3>Booking Details</h3>
            <div class="detail-row">
              <span><strong>Room:</strong></span>
              <span>${t.name} (${t.roomId})</span>
            </div>
            <div class="detail-row">
              <span><strong>Check-in:</strong></span>
              <span>${n}</span>
            </div>
            <div class="detail-row">
              <span><strong>Check-out:</strong></span>
              <span>${r}</span>
            </div>
            <div class="detail-row">
              <span><strong>Nights:</strong></span>
              <span>${i}</span>
            </div>
            <div class="detail-row">
              <span><strong>Guests:</strong></span>
              <span>${e.numberOfGuests}</span>
            </div>
            <div class="detail-row">
              <span><strong>Total Amount:</strong></span>
              <span>$${e.totalAmount}</span>
            </div>
            ${e.specialRequest?`
            <div class="detail-row">
              <span><strong>Special Request:</strong></span>
              <span>${e.specialRequest}</span>
            </div>
            `:""}
          </div>
          
          <p><strong>Status:</strong> ${e.status}</p>
          <p><strong>Payment Status:</strong> ${e.paymentStatus}</p>
          <p><strong>Booking Time:</strong> ${new Date(e.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </body>
    </html>
  `;try{let t=await $.emails.send({from:"Villa Shanti <bookings@villashanti.com>",to:[e.email],subject:`Booking Confirmation - ${e.bookingId}`,html:s}),n=await $.emails.send({from:"Villa Shanti <bookings@villashanti.com>",to:["reservations@villashanti.com"],subject:`New Booking - ${e.bookingId}`,html:a});return{success:!0,guestEmailId:t.data?.id,hotelEmailId:n.data?.id}}catch(e){return console.error("Error sending booking emails:",e),{success:!1,error:e instanceof Error?e.message:"Failed to send emails"}}}async function S(e){if(!process.env.RESEND_API_KEY)return console.warn("RESEND_API_KEY not configured, skipping email"),{success:!1,error:"Email service not configured"};let t=`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Contact Form Submission - Villa Shanti</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2c3e50; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .contact-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { padding: 8px 0; border-bottom: 1px solid #eee; }
        .detail-row:last-child { border-bottom: none; }
        .message-box { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #FF6B35; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏨 Villa Shanti - Contact Form</h1>
          <p>New message received</p>
        </div>
        
        <div class="content">
          <div class="contact-details">
            <h3>Contact Information</h3>
            <div class="detail-row">
              <strong>Name:</strong> ${e.name}
            </div>
            <div class="detail-row">
              <strong>Email:</strong> ${e.email}
            </div>
            <div class="detail-row">
              <strong>Subject:</strong> ${e.subject}
            </div>
            <div class="detail-row">
              <strong>Submitted:</strong> ${new Date().toLocaleString()}
            </div>
          </div>
          
          <div class="message-box">
            <h3>Message</h3>
            <p>${e.message.replace(/\n/g,"<br>")}</p>
          </div>
          
          <p><em>Please respond to this inquiry promptly.</em></p>
        </div>
      </div>
    </body>
    </html>
  `;try{let n=await $.emails.send({from:"Villa Shanti <contact@villashanti.com>",to:["dhiwagar555@gmail.com"],replyTo:e.email,subject:`Contact Form: ${e.subject}`,html:t});return{success:!0,emailId:n.data?.id}}catch(e){return console.error("Error sending contact email:",e),{success:!1,error:e instanceof Error?e.message:"Failed to send email"}}}},2021:(e,t,n)=>{n.d(t,{Z:()=>o});var r=n(1185),i=n.n(r);let s=process.env.MONGODB_URI||"mongodb://localhost:27017/villa-shanti";if(!s)throw Error("Please define the MONGODB_URI environment variable inside .env.local");let a=global.mongoose;a||(a=global.mongoose={conn:null,promise:null});let o=async function(){if(a.conn)return a.conn;a.promise||(a.promise=i().connect(s,{bufferCommands:!1}).then(e=>e));try{a.conn=await a.promise}catch(e){throw a.promise=null,e}return a.conn}}};