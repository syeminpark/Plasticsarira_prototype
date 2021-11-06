class MicroplasticDatabase {
    constructor() {

        /// 플라스틱 파라미터 리스트 . 플라스틱 당 15개. 

        this.microTypeList = ["Polyethylene", "Polypropylene", "Polystyrene", "Polyamide", "Polyester", "Acrylic", "Polyacetal", "PolyvinylChloride", "Polyurethane"]

        this.orginalFormListofList = [
            //Polyethylene
            ["Squeeze Bottle", "Laundry Detergent", "Cutting board", "Garbage bin", "Sandwich Bag", "Ready-meal Tray", "Cooking Oil Bottle", "First Aid Blanket", "Polar Fleece", "Jerry Can", "Drum,Ice Box", "Fishing rope", "Bulleproof Vest", "Fuel Tank"],
            //polypropylene
            ["Syringe", "Chip Bag", "Specimen Bottle", "Car Battery Case", "Instrument Panel", "Rug", "Crisp Bag", "Lunch Box", "Packing Tape", "Tobacco Package", "Beach Slipper", "Tote Bag", "Vacuum Cleaner", "Car Bumper", "Door Trim"],
            //Polystyrene
            ["Refrigerator", "Air Conditioner", "Oven", "Microwave", "Door Knob", "Televison", "Computer", "CD Case", "Egg Carton", "Model Car", "Ruler", "Hair Comb", "Videocassettes", "Gardening Pot ", "Protective Seat "],
            //Polyamide
            ["ToothBrush", "Wheel", "Glove", "Guitar pic", "Tennis Racket String", "Tent", "Banner", "Motor Insulator", "Wheel Cover", "Cable Protection", "Conveyor Belt", "Circuit Breaker", "Fuse", "Ski Binding", "Violin String"],
            //Polyester
            ["Seat Belt", "Fishing Net", "Underwear", "Towel", "Curtain", "Blanket", "Mouse Pad", "LCD", "Diaper", "Laundry Bag", "Table Cloth", "Balloon", "X-Ray Film", "Canoe", "Air Filter"],
            //Acrylic
            ["Lens", "Picture Frame", "Shelf", "Bulletproof Panel", "Fiber Optics", "Aquarium", "Pole sign", "Bike Helmet", "Retail Display", "Submarine Periscope", "Airplane Window", "Canopy", "Display Case", "Car paint", "Skylight"],
            //Polyacetal
            ["Eyeglass Frame", "Ball Bearing", "Knife Handle", "Lock System", "Shower Head", "Spring", "Faucet", "Fuel Pump", "Control Cable", "Kettle", "Drawer Runner", "Bushings", "Filter Housing", "Insulin Pen", "Snap Fastening"],
            //PolyvinylChloride
            ["Credit card ", "Rain Coat", "Boot", "Shower Curtain", "Shrink Wrap", "Heat Duct", "Vinyl Record", "Synthetic Leather", "Drainage Pipe", "Window Frame", "Artificial Skin", "Blood bag ", "Phonograph Record", "Traffic Cone", "Garden Hose"],
            //Polyurethane
            ["Couch", "Sport Shoe", "Rollerblade", "Tire", "Electronic Instrument", "Cushion Floor", "Engine Tubing", "Composite Wood", "Sponge", "Mattress Padding", "Wall Insulation", "Boat deck", "Water Tank", "Watch-band Wrapping", "Swimsuit"]
        ]

        //적힌 년도부터 2021년까지 랜덤한 년도 하나 
        this.madeInList = [1979, 1951, 1979, 1931, 1968, 1952, 1920, 1950, 1980]

        //마지막 객체에게 미세플라스틱이 전수된 방법. 상속(엄마에게 물려받음=Inheritance) 호흡(Respiration), 먹이 (Food_Consumption)
        this.absorbedByList = ["Inheritance","Respiration", "Food Consumption"]

        //지나온 리시트. 빈 배열 반환. 
        this.passBy = [];
    }

    initialize() {
        //랜덤하게 하나의 미세플라스틱 선정 
        let index = Math.round(random(0, this.microTypeList.length - 1))
        this.microType = this.microTypeList[index]
        this.absorbedBy = ""
        //앞에서 선정한 인덱스를 바탕으로 그 인덱스에 해당하는 원래 목적 리스트 중 하나를 랜덤하게 선정 
        this.originalForm = this.originalFormList[index][Math.round(random(0, this.originalFormList[index].length - 1))]
        //앞에서 선정한 인덱스를 바탕으로 그 인덱스에 해당하는 날짜부터 2021년까지 랜덤하게 년도 하나를 선정 
        this.madeIn = JSON.stringify(Math.round(random(this.madeInList[index], 2021)));

    }

    getDataList() {
        //이차원배열. this.passby가 하나의 배열이라.
        return this.dataList = [this.originalForm, this.madeIn, this.passBy, this.microType, this.absorbedBy]
    }

    //두가지 방법이 있을 것 같은데. 첫번째는 이 클라스 인스턴스 하나만 만들어서 initialize을 한번 하고 반환된 배열을
    //각각의 미세플라스틱안의 배열에 저장하는 것. 그리고 새로운 정보들을 그 배열에 업데이트 시키는 것
    // 그래서 각각의 미세플라스틱에 만든 하나의 인스턴스의 initialize 메서드만 사용하는 것. 
    //두번째 방법은 미세플라스틱마다 하나의 인스턴스를 만들어서 여기에 있는 배열에 데이터들을 업로드시키는 것.
    //두번째 방법 사용시 아마 밑에 있는 메서들을 이용하면 될 것 같네요. 

    //생물체 지나올때마다 축적시키기 
    setPassBy(organismType) {
        //this.passyBy 인덱스=2
        this.dataList[2].push(organismType)
    }

    //하나의 값만 필요하기 때문에. 계속 최신값으로 덮어씌우기 
    setAbsorbedBy(absorbedByIndex) {
           //this.absorbedBy 인덱스=4
        this.dataList[4] = this.absorbedByList[absorbedByIndex]
    }

}