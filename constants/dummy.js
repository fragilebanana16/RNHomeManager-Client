import assets from "./assets";

const ContactsData = [
  {
    id: "Conatacts-MyPC",
    name: "我的电脑",
    date: "Yesterday",
    description:
      "这是我的电脑",
    image: assets.myPc,
  },
  {
    id: "Conatacts-01",
    name: "龙哥",
    date: "04/05/2023",
    description:
      "已润。。。",
    image: assets.person01,
  },
  {
    id: "Conatacts-02",
    name: "小脏",
    date: "02/25/2022",
    description:
      "今天又是奥利给的一天",
    image: assets.person02,
  },
  {
    id: "Conatacts-03",
    name: "马老师",
    date: "12/22/2021",
    description:
      "发生深么事了？",
    image: assets.person03,
  },
  {
    id: "Conatacts-04",
    name: "ikun",
    date: "11/11/2077",
    description:
      "哎呦，你干嘛",
    image: assets.person04,
  },
  {
    id: "Conatacts-05",
    name: "杰哥",
    date: "Yesterday",
    description:
      "听话",
    image: assets.person01,
  },
  {
    id: "Conatacts-06",
    name: "峰哥亡命天涯",
    date: "Last Week",
    description:
      "老逼登",
    image: assets.person02,
  },
  {
    id: "Conatacts-07",
    name: "鸡脚",
    date: "Last Month",
    description:
      "呱",
    image: assets.person03,
  },
  {
    id: "Conatacts-08",
    name: "老胡",
    date: "05/09/2033",
    description:
      "重大利好！！！",
    image: assets.person01,
  },
  {
    id: "Conatacts-09",
    name: "Yolo",
    date: "04/05/2023",
    description:
      "You Only Live Once Bro",
    image: assets.person02,
  },
  {
    id: "Conatacts-10",
    name: "1D",
    date: "04/05/2023",
    description:
      "{-_-}",
    image: assets.person03,
  },
  {
    id: "Conatacts-11",
    name: "1D",
    date: "04/05/2023",
    description:
      "{-_-}",
    image: assets.person03,
  },
  {
    id: "Conatacts-12",
    name: "1D",
    date: "04/05/2023",
    description:
      "{-_-}",
    image: assets.person03,
  },
  {
    id: "Conatacts-13",
    name: "1D",
    date: "04/05/2023",
    description:
      "{-_-}",
    image: assets.person03,
  },
];


const NFTData = [
  {
    id: "NFT-01",
    name: "Abstracto #312",
    creator: "Putri Intan",
    price: 4.25,
    description:
      "The action painter abstract expressionists were directly influenced by automatism. Pollock channelled this into producing gestural. The action painter abstract expressionists were directly influenced by automatism. Pollock channelled this into producing gestural. The action painter abstract expressionists were directly influenced by automatism. Pollock channelled this into producing gestural.",
    image: assets.nft01,
    bids: [
      {
        id: "BID-11",
        name: "Jessica Tan",
        price: 4.25,
        image: assets.person02,
        date: "December 12, 2019 at 12:10 PM",
      },
      {
        id: "BID-12",
        name: "Jennifer Sia",
        price: 4.5,
        image: assets.person03,
        date: "December 27, 2019 at 1:50 PM",
      },
      {
        id: "BID-13",
        name: "Rosie Wong",
        price: 4.75,
        image: assets.person04,
        date: "December 31, 2019 at 3:50 PM",
      },
    ],
  },
  {
    id: "NFT-02",
    name: "Green Coins",
    creator: "Siti Nurhaliza",
    price: 7.25,
    description:
      "The action painter abstract expressionists were directly influenced by automatism. Pollock channelled this into producing gestural. Nulla sed velit erat vitae leo sem inceptos diam fames arcu hendrerit, quis ultrices in eleifend posuere ipsum conubia porttitor felis.",
    image: assets.nft02,
    bids: [
      {
        id: "BID-21",
        name: "Jessica Tan",
        price: 7.05,
        image: assets.person04,
        date: "December 12, 2019 at 12:10 PM",
      },
    ],
  },
  {
    id: "NFT-03",
    name: "NFT coins race",
    creator: "Elisabeth aho",
    price: 95.25,
    description:
      "The action painter abstract expressionists were directly influenced by automatism. Pollock channelled this into producing gestural. Lorem ipsum dolor sit amet consectetur adipiscing elit consequat accumsan sapien, lectus convallis malesuada odio curae habitasse dignissim nascetur. Nulla sed velit erat vitae leo sem inceptos diam fames arcu hendrerit, quis ultrices in eleifend posuere ipsum conubia porttitor felis. Lorem ipsum dolor sit amet consectetur adipiscing elit consequat accumsan sapien, lectus convallis malesuada odio curae habitasse dignissim nascetur. Nulla sed velit erat vitae leo sem inceptos diam fames arcu hendrerit, quis ultrices in eleifend posuere ipsum conubia porttitor felis.",
    image: assets.nft03,
    bids: [
      {
        id: "BID-31",
        name: "Jessica Tan",
        price: 95.25,
        image: assets.person02,
        date: "December 12, 2019 at 12:10 PM",
      },
      {
        id: "BID-32",
        name: "Jennifer Sia",
        price: 95.5,
        image: assets.person03,
        date: "December 27, 2019 at 1:50 PM",
      },
    ],
  },
  {
    id: "NFT-04",
    name: "Nifty NFT",
    creator: "Putri Intan",
    price: 54.25,
    description:
      "The action painter abstract expressionists were directly influenced by automatism. Pollock channelled this into producing gestural.Lorem ipsum dolor sit amet consectetur adipiscing elit consequat accumsan sapien, lectus convallis malesuada odio curae habitasse dignissim nascetur.",
    image: assets.nft04,
    bids: [
      {
        id: "BID-41",
        name: "Jessica Tan",
        price: 56.25,
        image: assets.person02,
        date: "December 12, 2019 at 12:10 PM",
      },
      {
        id: "BID-42",
        name: "Jennifer Sia",
        price: 54.25,
        image: assets.person03,
        date: "December 27, 2019 at 1:50 PM",
      },
      {
        id: "BID-43",
        name: "Rosie Wong",
        price: 55.15,
        image: assets.person04,
        date: "December 31, 2019 at 3:50 PM",
      },
      {
        id: "BID-44",
        name: "Vincent Swift",
        price: 54.15,
        image: assets.person02,
        date: "December 31, 2019 at 3:50 PM",
      },
    ],
  },
  {
    id: "NFT-05",
    name: "Colorful circles",
    creator: "David doe",
    price: 10.25,
    description:
      "The action painter abstract expressionists were directly influenced by automatism. Pollock channelled this into producing gestural.",
    image: assets.nft05,
    bids: [
      {
        id: "BID-51",
        name: "Jessica Tan",
        price: 10.25,
        image: assets.person02,
        date: "December 12, 2019 at 12:10 PM",
      },
    ],
  },
  {
    id: "NFT-06",
    name: "Black box model",
    creator: "Leo Messi",
    price: 20.25,
    description:
      "The action painter abstract expressionists were directly influenced by automatism. Pollock channelled this into producing gestural. Lorem ipsum dolor sit amet consectetur adipiscing elit consequat accumsan sapien, lectus convallis malesuada odio curae habitasse dignissim nascetur. Nulla sed velit erat vitae leo sem inceptos diam fames arcu hendrerit, quis ultrices in eleifend posuere ipsum conubia porttitor felis.",
    image: assets.nft06,
    bids: [
      {
        id: "BID-61",
        name: "Jessica Tan",
        price: 20.25,
        image: assets.person02,
        date: "December 12, 2019 at 12:10 PM",
      },
      {
        id: "BID-62",
        name: "Jennifer Sia",
        price: 20.5,
        image: assets.person03,
        date: "December 27, 2019 at 1:50 PM",
      },
      {
        id: "BID-63",
        name: "Rosie Wong",
        price: 20.75,
        image: assets.person04,
        date: "December 31, 2019 at 3:50 PM",
      },
      {
        id: "BID-64",
        name: "Siti Nurhaliza",
        price: 21.25,
        image: assets.person02,
        date: "December 31, 2019 at 3:50 PM",
      },
      {
        id: "BID-65",
        name: "Kaitlyn Lee",
        price: 7.25,
        image: assets.person02,
        date: "December 31, 2019 at 3:50 PM",
      },
    ],
  },
  {
    id: "NFT-07",
    name: "Abstracto soulful art",
    creator: "Victor de la Cruz",
    price: 18.25,
    description:
      "The action painter abstract expressionists were directly influenced by automatism. Pollock channelled this into producing gestural. Lorem ipsum dolor sit amet consectetur adipiscing elit consequat accumsan sapien, lectus convallis malesuada odio curae habitasse dignissim nascetur. Nulla sed velit erat vitae leo sem inceptos diam fames arcu hendrerit, quis ultrices in eleifend posuere ipsum conubia porttitor felis. Ullamcorper platea penatibus ornare egestas nulla ligula hendrerit nisl suscipit sociosqu maximus, tincidunt aptent habitant purus pharetra ultrices dapibus laoreet nisi lacinia. Porta malesuada netus vel sapien conubia porttitor aliquam ut pretium ante litora molestie senectus magna egestas sociosqu, eget aliquet fames pharetra felis posuere varius fringilla quisque in arcu montes eu ullamcorper.",
    image: assets.nft07,
    bids: [],
  },
];

export { NFTData, ContactsData };
