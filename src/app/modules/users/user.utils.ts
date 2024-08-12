export async function generateEmailOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// const otpCode = generateEmailOTP();
// console.log(`Your OTP code is: ${otpCode}`);
