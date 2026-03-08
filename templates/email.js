export const OTP = (otp) => {
    return `<div style="background:#f4f6f8;padding:40px 0;font-family:Arial,Helvetica,sans-serif;">
  <table align="center" width="420" style="background:white;border-radius:12px;padding:40px;text-align:center;box-shadow:0 10px 25px rgba(0,0,0,0.05)">
    <tr>
      <td>
        <img src="https://taggs.in/logo.png" width="120" alt="Taggs Logo" style="margin-bottom:20px"/>
      </td>
    </tr>
    <tr>
      <td>
        <h2 style="margin:0;color:#111;font-size:22px;">
          Verify your email
        </h2>
      </td>
    </tr>
    <tr>
      <td>
        <p style="color:#666;font-size:14px;margin-top:10px;">
          Use the OTP below to continue signing in to Taggs.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <div style="
          font-size:34px;
          font-weight:bold;
          letter-spacing:8px;
          margin:30px 0;
          padding:18px;
          background:#f3f4f6;
          border-radius:8px;
          color:#111;
        ">
          ${otp}
        </div>
      </td>
    </tr>
    <tr>
      <td>
        <p style="font-size:13px;color:#888;">
          This code expires in <b>5 minutes</b>.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p style="font-size:12px;color:#aaa;margin-top:25px;">
          If you didn't request this, you can safely ignore this email.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p style="font-size:11px;color:#bbb;margin-top:30px;">
          © ${new Date().getFullYear()} Taggs
        </p>
      </td>
    </tr>
  </table>
</div>`;
}