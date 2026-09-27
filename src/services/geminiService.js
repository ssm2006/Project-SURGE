// Gemini 3.7 Flash Reasoning & Multimodal Advisory Service
// Generates explainable risk rationales, cascade failure deductions, and multilingual plain-language advisories.

export const generateGeminiAdvisory = async ({
  cyclone,
  stageKey,
  zone,
  language = 'odia',
  urgencyLevel = 'Mandatory Evacuation'
}) => {
  // Simulate AI reasoning latency (300-600ms)
  await new Promise(resolve => setTimeout(resolve, 450));

  const stage = cyclone.stages[stageKey] || cyclone.stages['24h'];
  const langKey = language.toLowerCase();

  // Template dictionaries
  const advisories = {
    english: {
      title: `URGENT [${urgencyLevel.toUpperCase()}]: Anticipatory Action for ${zone.name}`,
      sms: `SURGE ALERT (${stageKey}): Cyclone ${cyclone.name.split(' ')[0]} approaching. Max wind ${stage.maxWindKmph} km/h, surge ${stage.surgePeakMeters}m. Residents in ${zone.name} must evacuate to ${zone.nearestShelter} before cut-off. Helpline 1077.`,
      whatsapp: `🚨 *PROJECT SURGE AI ADVISORY — ${zone.name.toUpperCase()}*
*Threat Assessment:* ${cyclone.category} (${stage.maxWindKmph} km/h, Surge ${stage.surgePeakMeters}m)
*Lead-Time Window:* ${stage.timestamp} | Status: ${stage.alertLevel}
*Composite Risk Score:* ${zone.compositeRiskScore}/100 (${zone.confidenceBand})

⚠️ *Action Plan for Municipal Ward Officers & Community Leaders:*
1. Immediately mobilize transport for ${zone.populationTotal.toLocaleString()} residents in ${zone.name}.
2. Inform families in informal dwellings (approx ${zone.informalHousingPct}%) to secure belongings and move to *${zone.nearestShelter}*.
3. Road Access Bottleneck: Single-access points will flood 12h prior to peak landfall.
4. Keep emergency provisions and medicine kits accessible.

📞 Emergency Command Hotline: *1077* | National Emergency: *112*`,
      cellBroadcast: `[CRITICAL ALERT] Immediate evacuation directed for ${zone.name}. Storm surge ${stage.surgePeakMeters}m expected. Proceed to ${zone.nearestShelter} immediately. Follow police directions. - Disaster Management Authority`,
      ivrScript: `Attention. This is an urgent automated voice broadcast from the Disaster Management Control Room. A ${cyclone.category} is tracking toward ${zone.name}. Sea waves up to ${stage.surgePeakMeters} meters and gale winds of ${stage.maxWindKmph} kilometers per hour are expected. If your house has a thatched or tin roof, please proceed immediately to ${zone.nearestShelter}. Emergency evacuation vehicles have been dispatched. Press 1 for immediate assistance.`
    },
    odia: {
      title: `ଜରୁରୀକାଳୀନ ସୂଚନା [${urgencyLevel}]: ${zone.name} ପାଇଁ ସ୍ଥାନାନ୍ତର ନିର୍ଦ୍ଦେଶନାମା`,
      sms: `ସର୍ଜ୍ ସତର୍କତା (${stageKey}): ${cyclone.name.split(' ')[0]} ବାତ୍ୟା ଉପକୂଳ ମୁହାଁ। ପବନ ${stage.maxWindKmph} କିମି/ଘଣ୍ଟା, ଜୁଆର ${stage.surgePeakMeters} ମିଟର। ${zone.name} ର ବାସିନ୍ଦା ତୁରନ୍ତ ${zone.nearestShelter} କୁ ସ୍ଥାନାନ୍ତର ହୁଅନ୍ତୁ। ହେଲ୍ପଲାଇନ: ୧୦୭୭।`,
      whatsapp: `🚨 *ପ୍ରକଳ୍ପ ସର୍ଜ୍ (SURGE) — ସରକାରୀ ବାତ୍ୟା ସତର୍କତା ନିର୍ଦ୍ଦେଶ*
*ଅଞ୍ଚଳ:* ${zone.name}
*ବିପଦ ଆକଳନ:* ${cyclone.category} (ପବନ: ${stage.maxWindKmph} କିମି/ଘଣ୍ଟା, ସାମୁଦ୍ରିକ ଜୁଆର: ${stage.surgePeakMeters} ମିଟର)
*ସମୟସୀମା:* ${stage.timestamp} | ସତର୍କ ସ୍ତର: ${stage.alertLevel}
*ସାମଗ୍ରିକ ବିପଦ ମାନାଙ୍କ:* ${zone.compositeRiskScore}/100 (${zone.confidenceBand})

⚠️ *ଗ୍ରାମ ପଞ୍ଚାୟତ ଓ ୱାର୍ଡ ଅଧିକାରୀଙ୍କ ପାଇଁ କାର୍ଯ୍ୟସୂଚୀ:*
୧. ${zone.name} ର ପ୍ରାୟ ${zone.populationTotal.toLocaleString()} ଜଣ ଲୋକଙ୍କୁ ସୁରକ୍ଷିତ ଆଶ୍ରୟସ୍ଥଳକୁ ସ୍ଥାନାନ୍ତର କରନ୍ତୁ।
୨. କଚ୍ଚା ଘରେ ଥିବା ପରିବାର ମାନଙ୍କୁ ତୁରନ୍ତ *${zone.nearestShelter}* କୁ ପଠାନ୍ତୁ।
୩. ଏକମାତ୍ର ଉପକୂଳ ରାସ୍ତା ପାଣିରେ ବୁଡ଼ିବା ପୂର୍ବରୁ ଗାଡ଼ି ଚଳାଚଳ ସମ୍ପନ୍ନ କରନ୍ତୁ।
୪. ଔଷଧ, ପାଣି ଏବଂ ଶିଶୁ ଖାଦ୍ୟ ସାଙ୍ଗରେ ରଖିବାକୁ ଜଣାନ୍ତୁ।

📞 ଜିଲ୍ଲା କଣ୍ଟ୍ରୋଲ ରୁମ୍: *୧୦୭୭* | ପୋଲିସ / ଜରୁରୀକାଳୀନ: *୧୧୨*`,
      cellBroadcast: `[ଜରୁରୀ ସତର୍କତା] ${zone.name} ଅଞ୍ଚଳବାସୀଙ୍କ ପାଇଁ ତୁରନ୍ତ ସ୍ଥାନାନ୍ତର ନିର୍ଦ୍ଦେଶ। ସମୁଦ୍ର ଜୁଆର ${stage.surgePeakMeters} ମିଟର ବୃଦ୍ଧି ପାଇବ। ନିକଟସ୍ଥ ବାତ୍ୟା ଆଶ୍ରୟସ୍ଥଳକୁ ଯାଆନ୍ତୁ। ସାହାଯ୍ୟ ପାଇଁ: ୧୦୭୭ - ଓଡ଼ିଶା ସରକାର`,
      ivrScript: `ନମସ୍କାର। ଜିଲ୍ଲା ବିପର୍ଯ୍ୟୟ ପରିଚାଳନା କକ୍ଷରୁ ଏହା ଏକ ଜରୁରୀ ସତର୍କ ବାର୍ତ୍ତା। ${cyclone.name.split(' ')[0]} ବାତ୍ୟା ଯୋଗୁଁ ${zone.name} ରେ ${stage.maxWindKmph} କିଲୋମିଟର ବେଗରେ ପବନ ଓ ${stage.surgePeakMeters} ମିଟର ଉଚ୍ଚ ଜୁଆର ଆସିପାରେ। ଦୟାକରି ତୁରନ୍ତ ${zone.nearestShelter} କୁ ଚାଲିଯାଆନ୍ତୁ। ସାହାଯ୍ୟ ପାଇଁ ୧ ଦବାନ୍ତୁ କିମ୍ବା ୧୦୭୭ କଲ କରନ୍ତୁ।`
    },
    bengali: {
      title: `জরুরি নির্দেশিকা [${urgencyLevel}]: ${zone.name} অঞ্চলের জন্য সতর্কবার্তা`,
      sms: `সার্জ সতর্কতা (${stageKey}): ঘূর্ণিঝড় ${cyclone.name.split(' ')[0]} উপকূলের দিকে এগোচ্ছে। গতিবেগ ${stage.maxWindKmph} কিমি/ঘণ্টা, জলোচ্ছ্বাস ${stage.surgePeakMeters} মিটার। ${zone.name} এর কাঁচা বাড়ির বাসিন্দারা দ্রুত নিকটস্থ শেল্টারে যান। ফোন: ১০৭৭।`,
      whatsapp: `🚨 *প্রজেক্ট সার্জ (SURGE) — জরুরি ঘূর্ণিঝড় সতর্কবার্তা*
*এলাকা:* ${zone.name}
*ঝড়ের তীব্রতা:* ${stage.maxWindKmph} কিমি/ঘণ্টা | জলোচ্ছ্বাস: ${stage.surgePeakMeters} মিটার
*ঝুঁকি সূচক:* ${zone.compositeRiskScore}/100 (${zone.confidenceBand})

⚠️ *জরুরি নির্দেশ:*
১. ${zone.name} এলাকার বাসিন্দাদের দ্রুত *${zone.nearestShelter}* এ স্থানান্তর করুন।
২. কাঁচা ও টিনের চালের বাসিন্দাদের অগ্রাধিকার দিন।
৩. সড়ক যোগাযোগ বন্ধ হওয়ার আগেই সরিয়ে নেওয়ার কাজ শেষ করুন।

📞 কন্ট্রোল রুম: *১০৭৭* | হেল্পলাইন: *১১২*`,
      cellBroadcast: `[জরুরি সতর্কতা] ${zone.name} উপকূলীয় অঞ্চল দ্রুত খালি করুন। ${stage.surgePeakMeters} মিটার জলোচ্ছ্বাসের আশঙ্কা। আশ্রয়কেন্দ্রে যান। হেল্পলাইন: ১০৭৭`,
      ivrScript: `নমস্কার। জেলা বিপর্যয় মোকাবিলা কেন্দ্র থেকে জানানো হচ্ছে, ${zone.name} অঞ্চলে ঘূর্ণিঝড় আঘাত হানতে পারে। জলোচ্ছ্বাসের সম্ভাবনা রয়েছে। অবিলম্বে আশ্রয়কেন্দ্রে চলে যান। সহায়তার জন্য ১০৭৭ নম্বরে যোগাযোগ করুন।`
    },
    telugu: {
      title: `అత్యవసర హెచ్చరిక [${urgencyLevel}]: ${zone.name} కోసం తుఫాను ఆదేశాలు`,
      sms: `సర్జ్ అలర్ట్ (${stageKey}): తుఫాను వేగం ${stage.maxWindKmph} కి.మీ, అలల ఎత్తు ${stage.surgePeakMeters} మీటర్లు. ${zone.name} ప్రజలు వెంటనే షెల్టర్‌కు వెళ్లండి. హెల్ప్‌లైన్: 1077.`,
      whatsapp: `🚨 *ప్రాజెక్ట్ సర్జ్ — అధికారిక హెచ్చరిక (${zone.name})*
*తీవ్రత:* గాలి వేగం ${stage.maxWindKmph} కి.మీ | అలలు: ${stage.surgePeakMeters} మీటర్లు
*రిస్క్ స్కోర్:* ${zone.compositeRiskScore}/100

⚠️ వెంటనే సురక్షిత షెల్టర్ *${zone.nearestShelter}* కు చేరుకోండి. రోడ్లు మూసుకుపోయే ప్రమాదం ఉంది.`,
      cellBroadcast: `అత్యవసర ఆదేశం: ${zone.name} ప్రజలు వెంటనే సురక్షిత ప్రాంతాలకు వెళ్లండి. అలల ఎత్తు ${stage.surgePeakMeters} మీటర్లు. ఫోన్: 1077`,
      ivrScript: `నమస్కారం. తుఫాను ముప్పు ఉన్నందున ${zone.name} ప్రజలు వెంటనే సమీప పునరావాస కేంద్రానికి వెళ్లవలసిందిగా కోరడమైనది.`
    },
    tamil: {
      title: `அவசர எச்சரிக்கை [${urgencyLevel}]: ${zone.name} பகுதி மக்களுக்கான அறிவுரை`,
      sms: `சர்ஜ் எச்சரிக்கை (${stageKey}): காற்று ${stage.maxWindKmph} கி.மீ, கடல் அலை ${stage.surgePeakMeters} மீ. ${zone.name} மக்கள் உடனே புயல் காப்பகத்திற்கு செல்லவும். உதவிக்கு: 1077.`,
      whatsapp: `🚨 *ப்ராஜெக்ட் சர்ஜ் — அவசர புயல் வெளியேற்ற உத்தரவு (${zone.name})*
*எச்சரிக்கை:* காற்று ${stage.maxWindKmph} கி.மீ | அலை சீற்றம்: ${stage.surgePeakMeters} மீ
*ஆபத்து நிலை:* ${zone.compositeRiskScore}/100

⚠️ பொதுமக்கள் உடனே *${zone.nearestShelter}* முகாமிற்கு செல்லுமாறு கேட்டுக்கொள்ளப்படுகிறார்கள்.`,
      cellBroadcast: `அவசர உத்தரவு: ${zone.name} பகுதி உடனடியாக காலி செய்யப்பட வேண்டும். உதவி எண்: 1077`,
      ivrScript: `வணக்கம். புயல் அபாயம் உள்ளதால் ${zone.name} மக்கள் உடனடியாக நிவாரண முகாமிற்கு செல்லவும்.`
    },
    hindi: {
      title: `आपातकालीन परामर्श [${urgencyLevel}]: ${zone.name} हेतु चक्रवात निकासी निर्देश`,
      sms: `सर्ज अलर्ट (${stageKey}): चक्रवात गति ${stage.maxWindKmph} किमी/घंटा, तूफानी लहरें ${stage.surgePeakMeters} मीटर। ${zone.name} के निवासी तुरंत शेल्टर पहुंचे। सहायता: 1077।`,
      whatsapp: `🚨 *प्रोजेक्ट सर्ज — आधिकारिक चक्रवात परामर्श (${zone.name})*
*खतरा:* हवा की गति ${stage.maxWindKmph} किमी/घंटा | तूफानी लहरें: ${stage.surgePeakMeters} मी
*जोखिम स्कोर:* ${zone.compositeRiskScore}/100 (${zone.confidenceBand})

⚠️ *निर्देश:*
१. ${zone.name} के सभी निवासी तुरंत *${zone.nearestShelter}* में शरण लें।
२. सड़क मार्ग जलमग्न होने से पूर्व निकासी पूर्ण करें।`,
      cellBroadcast: `आपातकालीन चेतावनी: ${zone.name} क्षेत्र को तत्काल खाली करें। शेल्टर में शरण लें। फोन: 1077`,
      ivrScript: `नमस्कार। चक्रवात के खतरे को देखते हुए ${zone.name} के नागरिक तुरंत नजदीकी आश्रय स्थल पहुंचें। मदद के लिए 1077 डायल करें।`
    }
  };

  return advisories[langKey] || advisories['english'];
};

// Generates Gemini Multimodal Decision-Support Rationale for DMO
export const generateGeminiRationale = ({
  cyclone,
  stageKey,
  zone,
  cascadeNodes = []
}) => {
  const stage = cyclone.stages[stageKey] || cyclone.stages['24h'];
  const isolatedNodes = cascadeNodes.filter(n => n.isolated || n.status.includes('inundated') || n.status.includes('isolated'));

  return {
    summary: `At ${stageKey} prior to landfall, Zone '${zone.name}' registers composite hazard-equity vulnerability score of ${zone.compositeRiskScore}/100 (${zone.confidenceBand}).`,
    physicsDriver: `Coupled hydrodynamic simulation indicates peak marine surge of ${stage.surgePeakMeters}m coincident with ${stage.rainfallForecastMm24h}mm 24-hr precipitation accumulation and ${stage.maxWindKmph} km/h gale gusts. Low-lying elevations (<2.5m ASL) will experience sustained saline submergence.`,
    equityDriver: `Demographic cross-matching identifies ${zone.informalHousingPct}% thatch/kutcha housing and an elderly/dependent demographic ratio of ${zone.elderlyDisabledPct}%. Due to structural fragility, sheltering-in-place carries severe mortality hazard.`,
    cascadeRisk: isolatedNodes.length > 0
      ? `Critical Infrastructure Warning: ${isolatedNodes.map(n => n.name).join(', ')} is predicted to be compromised within the next 8 hours, eliminating dry evacuation corridors and severing auxiliary power backup.`
      : `Arterial highways currently maintain transit capacity; however, low-lying culverts are expected to reach threshold overflow by ${stageKey === '72h' ? 'T-36h' : 'T-16h'}.`,
    defensibleDecision: `RECOMMENDATION FOR DMO: Issue mandatory evacuation directive with minimum lead time of ${zone.leadTimeHoursNeeded} hours. Prioritize government bus allocations to rural hamlets on single-access coastal spines before bridge submergence occurs.`
  };
};
