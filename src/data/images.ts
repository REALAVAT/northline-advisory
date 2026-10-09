export function unsplash(id: string, width = 1600) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;
}

export const images = {
  heroOffice: unsplash("1497366216548-37526070297c"),
  skyline: unsplash("1496442226666-8d4d0e62e6e9"),
  midtown: unsplash("1534430480872-3498386e7856"),
  towers: unsplash("1486406146926-c627a92ad1ab"),
  building: unsplash("1560179707-f14e90ef3623"),
  teamMeeting: unsplash("1522071820081-009f0129c71c"),
  boardroom: unsplash("1600880292203-757bb62b4baf"),
  workshop: unsplash("1556761175-5973dc0f32e7"),
  handshake: unsplash("1521791136064-7986c2920216"),
  documents: unsplash("1554224154-26032ffc0d07"),
  calculator: unsplash("1554224155-6726b3ff858f"),
  signing: unsplash("1450101499163-c8848c66ca85"),
  analytics: unsplash("1460925895917-afdab827c52f"),
  dashboard: unsplash("1551288049-bebda4e38f71"),
  charts: unsplash("1611974789855-9c2a0a7236a3"),
  planning: unsplash("1454165804606-c3d57bc86b40"),
  laptopWork: unsplash("1553877522-43269d4ea984"),
  presentation: unsplash("1542744173-8e7e53415bb0"),
  meetingRoom: unsplash("1517245386807-bb43f82c33c4"),
  ecommerce: unsplash("1563986768609-322da13575f3"),
  healthcare: unsplash("1576091160550-2173dba999ef"),
  realEstate: unsplash("1560518883-ce09059eeffa"),
  startup: unsplash("1559136555-9303baea8ebd"),
  savings: unsplash("1579532537598-459ecdaf39cc"),
  finance: unsplash("1526304640581-d334cdbbf45e"),
  legal: unsplash("1505664194779-8beaceb93744"),
  reviewing: unsplash("1568992687947-868a62a9f521"),
  officeTalk: unsplash("1556157382-97eda2d62296"),
} as const;
