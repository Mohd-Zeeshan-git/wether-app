/**
 *  * Detect device capability to scale visual effects
  * Uses hardwareConcurrency as a lightweight heuristic
   */
   export function getDeviceProfile() {
// ------------------------------
  // 1️⃣ Fallback-safe core count
    // ------------------------------
 const cores =
typeof navigator !== 'undefined' &&
    navigator.hardwareConcurrency
? navigator.hardwareConcurrency
 : 4

   // ------------------------------
// 2️⃣ Low-end device heuristic
  // ------------------------------
    const isLowEnd = cores <= 4

 // ------------------------------
   // 3️⃣ Particle scaling factor
// ------------------------------
  const particleMultiplier = isLowEnd ? 0.4 : 1

    return {
   cores,
  isLowEnd,
 particleMultiplier
   }
   }
   
 