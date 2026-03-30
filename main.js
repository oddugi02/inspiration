// Version 2.0.1
document.addEventListener('DOMContentLoaded', () => {
    // Navigation Logic
    const btnOutside = document.getElementById('btn-outside');
    const btnInside = document.getElementById('btn-inside');

    if (btnOutside) {
        btnOutside.addEventListener('click', () => {
            location.href = 'outside.html';
        });
    }

    if (btnInside) {
        btnInside.addEventListener('click', () => {
            location.href = 'inside.html';
        });
    }

    // Exhibition Filtering Logic
    const filterToggle = document.getElementById('current-filter');
    const cards = document.querySelectorAll('.exhibition-card');

    if (filterToggle) {
        filterToggle.addEventListener('change', () => {
            const onlyCurrent = filterToggle.checked;

            cards.forEach(card => {
                if (onlyCurrent && card.classList.contains('upcoming')) {
                    card.style.display = 'none';
                } else {
                    card.style.display = 'flex';
                }
            });
        });
    }

    // Book Archive Accordion Logic (Removed as categories now use chip filtering)

    // Chip Filtering Logic
    const globalChips = document.querySelectorAll('.global-filter-container .filter-chip');
    const Sections = document.querySelectorAll('.reference-category, .studio-category');
    
    // Global Category Filter
    globalChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const filterValue = chip.getAttribute('data-filter');
            
            // Update active state
            globalChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            
            // Filter sections
            Sections.forEach(section => {
                if (filterValue === 'all' || section.getAttribute('data-category') === filterValue) {
                    section.classList.remove('hidden');
                    section.classList.add('fade-in-section');
                } else {
                    section.classList.add('hidden');
                    section.classList.remove('fade-in-section');
                }
            });
        });
    });

    // Book Archive Filter Logic
    const bookChips = document.querySelectorAll('.books-container .filter-chip');
    const bookSections = document.querySelectorAll('.book-category-section');

    if (bookChips.length > 0) {
        bookChips.forEach(chip => {
            chip.addEventListener('click', () => {
                const filterValue = chip.getAttribute('data-filter');

                // Update active state
                bookChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');

                // Filter sections
                bookSections.forEach(section => {
                    const category = section.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue) {
                        section.classList.remove('hidden');
                        section.classList.add('fade-in-section');
                    } else {
                        section.classList.add('hidden');
                        section.classList.remove('fade-in-section');
                    }
                });
            });
        });
    }


    // Smooth reveal animation for cards/items
    const animatable = document.querySelectorAll('.exhibition-card, .book-card, .studio-card');
    animatable.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.6s cubic-bezier(0.2, 0, 0.2, 1) ${index * 0.05}s, transform 0.6s cubic-bezier(0.2, 0, 0.2, 1) ${index * 0.05}s`;

        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            // Clear inline transition after the animation is finished
            setTimeout(() => {
                if (item.style.opacity === '1') {
                    item.style.transition = '';
                }
            }, 600 + (index * 50)); 
        }, 100);
    });

    // --- Knowledge Pieces (Discovery Hub) Logic ---
    const knowledgeData = {
        "design_history_concepts": [
            { "title": "아나모포시스 (Anamorphosis)", "desc": "특정 각도에서만 형태가 온전히 보이는 왜곡된 투영법입니다.", "tip": "3D 공간에서 카메라 앵글에 따라 로고가 완성되는 인터랙션 기획에 활용하세요.", "keyword": "Perspective Distortion" },
            { "title": "아이소타이프 (Isotype)", "desc": "언어를 배제하고 통계 정보를 기호화한 국제 시각 언어 체계입니다.", "tip": "인포그래픽 과제 시, 아이콘의 '최소 단위'를 어떻게 설정할지 근거로 삼으세요.", "keyword": "Pictorial Statistics" },
            { "title": "구체시 (Concrete Poetry)", "desc": "텍스트의 배열 자체가 하나의 이미지가 되어 시의 의미를 전달하는 형식입니다.", "tip": "타이포그래피가 '읽기'를 넘어 '형태'가 되는 실험적 레이아웃의 원조입니다.", "keyword": "Visual Poetry" },
            { "title": "울름 조형 대학 (HfG Ulm)의 시스템", "desc": "바우하우스의 계승자이자, 디자인을 공학적 시스템으로 접근한 학교입니다.", "tip": "브라운(Braun)사 스타일의 엄격한 모듈러 디자인을 설명할 때 인용하세요.", "keyword": "Systemic Design" },
            { "title": "심리적 지리학 (Psychogeography)", "desc": "도시의 환경이 개인의 감정과 행동에 미치는 영향을 지도로 표현한 개념입니다.", "tip": "데이터 시각화나 지도 디자인 시 '감성적 데이터'를 어떻게 시각화할지 힌트를 얻으세요.", "keyword": "Emotional Mapping" },
            { "title": "슈퍼그래픽 (Supergraphics)", "desc": "2D 그래픽이 3D 건축 공간을 덮어 구조를 왜곡하거나 확장하는 형식입니다.", "tip": "전시 디자인이나 공간 브랜딩 시 그래픽의 '스케일'로 압도하는 법을 연구하세요.", "keyword": "Spatial Graphics" },
            { "title": "뉴 웨이브 (New Wave) 타이포", "desc": "스위스 스타일의 규칙을 깨고 겹침, 간격, 텍스처를 실험한 '포스트-스위스' 양식입니다.", "tip": "그리드 위에서 레이어를 무질서하게 쌓아보고 싶을 때 이 미학을 꺼내 드세요.", "keyword": "Swiss Punk" },
            { "title": "베르나큘라 디자인 (Vernacular)", "desc": "전문 디자이너가 아닌 평범한 사람들이 만든 길거리 간판, 전단지 등의 토속적 미학입니다.", "tip": "가장 한국적이거나 가장 일상적인 '날것'의 조형을 작업에 끌어올 때 유용합니다.", "keyword": "Everyday Aesthetic" },
            { "title": "안티-디자인 (Anti-Design)", "desc": "기능주의와 좋은 디자인의 고정관념을 거부한 70년대 이탈리아의 저항 운동입니다.", "tip": "키치하고 파격적인 형태의 3D 오브젝트를 만들 때 '반항적 태도'의 근거가 됩니다.", "keyword": "Rebellious Form" },
            { "title": "오울리포 (Oulipo)적 제약", "desc": "특정 규칙이나 제약을 스스로 부여하여 창의성을 극대화하는 창작 방식입니다.", "tip": "컬러 2개만 쓰기, 그리드 3개만 쓰기 등 스스로 제약을 걸어 디자인적 해법을 찾으세요.", "keyword": "Creative Constraint" },
            { "title": "기호학적 함축 (Connotation)", "desc": "이미지가 가진 1차적 의미 너머의 사회문화적 숨은 의미를 분석하는 개념입니다.", "tip": "로고의 조형이 왜 '신뢰'나 '혁신'을 상징하는지 크리틱에서 논리적으로 방어하세요.", "keyword": "Semiotics" },
            { "title": "토탈 디자인 (Total Design) 철학", "desc": "빔 크라우벨이 주창한, 모든 시각 요소를 하나의 그리드 시스템으로 통합하는 방식입니다.", "tip": "브랜드 아이덴티티가 모든 매체에서 일관된 그리드를 가져야 할 때 인용하세요.", "keyword": "Grid Unity" },
            { "title": "레트라세트 (Letraset) 미학", "desc": "판화처럼 문질러서 전사하는 아날로그 타이포 도구에서 온 불완전한 질감입니다.", "tip": "디지털 작업에서 의도적으로 삐뚤빼뚤하거나 거친 손맛을 낼 때 이 형식을 떠올리세요.", "keyword": "Dry Transfer Texture" },
            { "title": "상황주의자 인터내셔널 (SI)", "desc": "기존 자본주의 소외를 비판하며 '표류'와 '우회'를 통해 예술을 일상화하려던 집단입니다.", "tip": "사용자의 이동 경로를 비틀거나 예상치 못한 재미를 주는 웹 인터랙션에 응용하세요.", "keyword": "Situationist Art" },
            { "title": "플럭서스 (Fluxus)", "desc": "결과물보다 '과정'과 '사건'을 중시하며 경계를 허문 60년대 예술 운동입니다.", "tip": "완성된 그래픽이 아니라, 실시간으로 변하는 제너레이티브 아트의 철학적 배경이 됩니다.", "keyword": "Process Art" },
            { "title": "엔타시스 (Entasis) 보정", "desc": "시각적 착시를 해결하기 위해 기둥이나 획의 중앙을 미세하게 부풀리는 기법입니다.", "tip": "폰트 디자인이나 로고 제작 시, 기계적 정렬이 아닌 '시각적 정렬'을 할 때 필수입니다.", "keyword": "Optical Correction" },
            { "title": "바니타스 (Vanitas) 정물", "desc": "삶의 허무함과 죽음을 상징하는 사물들을 배치한 17세기 회화 형식입니다.", "tip": "3D 씬을 구성할 때 해골, 시든 꽃 등으로 심오한 서사를 부여하고 싶을 때 참고하세요.", "keyword": "Memento Mori" },
            { "title": "아이소메트릭 (Isometric) 투영", "desc": "원근감이 제거된 3축 평행 투영법으로, 모든 면의 비율이 일정한 형식입니다.", "tip": "디지털 다이어그램이나 웹상의 입체적 아이콘 배치 시 공간적 질서를 줍니다.", "keyword": "Parallel Depth" },
            { "title": "게슈탈트 프레그난츠 법칙", "desc": "모호한 형상을 가능한 한 단순하고 안정적인 형태로 인식하려는 뇌의 본능입니다.", "tip": "복잡한 레이아웃을 시각적으로 그룹화하여 사용자의 인지 부하를 줄일 때 활용하세요.", "keyword": "Law of Simplicity" },
            { "title": "데포르마시옹 (Deformation)", "desc": "주관적 표현을 위해 대상을 의도적으로 왜곡하거나 변형하는 조형 방식입니다.", "tip": "실제 비율보다 과장된 캐릭터 모델링이나 타이포 변주의 미학적 근거가 됩니다.", "keyword": "Stylized Distortion" },
            { "title": "알레아토릭 (Aleatoric) 형식", "desc": "우연과 무작위성을 창작의 핵심 요소로 도입하는 방식입니다.", "tip": "p5.js의 random() 함수로 디자이너가 통제할 수 없는 우연의 미를 만들 때 쓰세요.", "keyword": "Chance Composition" }
        ],
        "design_trend": [
            { "title": "하이퍼-벤토 (Hyper-Bento)", "desc": "Z축(깊이)과 겹침을 활용해 평면적인 그리드를 입체적 공간으로 진화시킨 레이아웃입니다.", "tip": "각 칸의 깊이감을 다르게 설정해 웹페이지를 하나의 3D 상자처럼 보이게 하세요.", "keyword": "3D Bento" },
            { "title": "피지털 텍스처 (Phygital)", "desc": "물리적(Physical) 재질과 디지털(Digital) 광원을 결합해 생경한 질감을 만드는 트렌드입니다.", "tip": "점토 질감에 네온 빛을 섞거나, 금속 질감에 유기적 형태를 부여해 보세요.", "keyword": "Material Mix" },
            { "title": "가변 서체 인터랙션", "desc": "마우스 좌표나 스크롤에 따라 서체의 굵기, 너비가 실시간으로 변하는 기술입니다.", "tip": "텍스트가 단순히 움직이는 것을 넘어 '유동적으로 변형되는' 재미를 주어 보세요.", "keyword": "Fluid Typography" },
            { "title": "안티-UX / 브루탈리스트 웹", "desc": "사용 편의성의 공식을 일부러 깨뜨려 시각적 충격과 원시적 미학을 강조하는 방식입니다.", "tip": "실험적인 작가 포트폴리오 사이트에서 '불친절함의 미학'을 시도해 보세요.", "keyword": "Friction UX" },
            { "title": "시노그래픽 웹 (Scenographic)", "desc": "웹페이지를 하나의 무대 공간처럼 구성하여 사용자가 그 안을 탐험하게 만듭니다.", "tip": "스크롤을 따라 카메라 앵글이 변하는 Three.js 기반의 입체적 서사를 구축하세요.", "keyword": "Web Scenography" },
            { "title": "제너레이티브 노스탤지어", "desc": "최첨단 AI 기술로 90년대 특유의 낮은 화질과 아날로그 질감을 재현하는 역설적 유행입니다.", "tip": "매끈한 렌더링 결과물에 의도적인 노이즈와 프레임 드랍을 섞어 향수를 자극하세요.", "keyword": "Lo-fi Tech" },
            { "title": "데이터 시각 시 (Data Poetry)", "desc": "정보 전달을 넘어 데이터의 패턴 자체를 추상적인 예술적 선과 면으로 승화시킵니다.", "tip": "딱딱한 그래프 대신, 흐르는 물결이나 흩어지는 파티클로 데이터를 표현해 보세요.", "keyword": "Lyric Visualization" },
            { "title": "키네틱 브랜딩 (Dynamic Identity)", "desc": "로고가 고정된 형태가 아니라 사운드나 데이터에 반응해 끊임없이 변하는 시스템입니다.", "tip": "주변 소리에 따라 형태가 꿈틀대는 반응형 로고를 Three.js로 구현해 보세요.", "keyword": "Living Logo" },
            { "title": "가변적 컬러 시스템", "desc": "고정된 브랜드 컬러 대신 주변 환경이나 사용자 정보에 따라 실시간으로 변하는 테마입니다.", "tip": "이미지에서 주요 색상을 추출해 UI의 전체 분위기를 자동으로 바꾸는 기능을 넣으세요.", "keyword": "Adaptive Palette" },
            { "title": "클레이모피즘 (Claymorphism)", "desc": "점토로 빚은 듯한 부드러운 부피감과 둥글둥글한 느낌을 주는 3D UI 스타일입니다.", "tip": "친근한 메타버스 캐릭터나 아이콘 디자인에 이 말랑말랑한 질감을 적용해 보세요.", "keyword": "Soft Volume" },
            { "title": "레트-CGI (Retro-CGI)", "desc": "90년대 초반의 투박한 초기 3D 그래픽 감성을 의도적으로 복제한 스타일입니다.", "tip": "너무 완벽한 렌더링 대신 낮은 폴리곤과 정직한 그림자로 키치한 미래감을 연출하세요.", "keyword": "Old-school 3D" },
            { "title": "비선형 스크롤링", "desc": "상하 스크롤이 아닌 대각선, 원형, 혹은 깊이(Z축) 방향으로 이동하는 구조입니다.", "tip": "사용자가 '길을 잃는 즐거움'을 느낄 수 있는 실험적 웹사이트에 도입하세요.", "keyword": "Non-linear Flow" },
            { "title": "햅틱 피드백 시각화", "desc": "시각적 움직임만으로 실제 손가락 끝에 물리적 진동이 느껴지는 듯한 착각을 줍니다.", "tip": "버튼 클릭 시 미세한 떨림이나 빛의 번짐 애니메이션으로 '타격감'을 극대화하세요.", "keyword": "Tactile Digital" },
            { "title": "네오-펄프 (Neo-Pulp)", "desc": "거친 종이 질감, 망점 인쇄, 잉크 번짐 등 아날로그 인쇄물의 물성을 디지털로 재해석합니다.", "tip": "화면 속에서 아날로그 잡지의 따뜻한 '손맛'을 구현하고 싶을 때 유용합니다.", "keyword": "Modern Grunge" },
            { "title": "마이크로-타이포 패턴", "desc": "아주 작은 글자들을 패턴처럼 반복 배치하여 하나의 시각적 텍스처로 만드는 기법입니다.", "tip": "멀리서 보면 재질, 가까이서 보면 정보가 되는 이중적인 디자인을 시도해 보세요.", "keyword": "Text as Texture" },
            { "title": "반응형 쉐이더 (Reactive Shader)", "desc": "마우스 움직임이나 소리의 파형에 따라 실시간으로 재질이 일렁이는 기술입니다.", "tip": "오브젝트가 단순한 사물이 아닌 '살아있는 유기체'처럼 보이게 할 때 핵심입니다.", "keyword": "Live Mesh" },
            { "title": "하이브리드 인터페이스", "desc": "2D의 평면적 요소와 3D의 입체적 요소가 한 화면에서 경계 없이 뒤섞이는 방식입니다.", "tip": "텍스트는 그리드 위에, 메인 아트워크는 3D 공간에 두어 독특한 깊이감을 주어 보세요.", "keyword": "Dimensional Mix" },
            { "title": "공간 오디오 UI", "desc": "화면 속 오브젝트의 위치에 따라 소리의 방향과 크기가 변하는 청각적 인터페이스입니다.", "tip": "웹 디자인 시 사운드 라이브러리를 활용해 시각과 청각이 일치되는 몰입감을 주어 보세요.", "keyword": "3D Audio UX" },
            { "title": "AI 협업 미학", "desc": "AI가 생성한 기괴하고 낯선 형태를 디자이너가 정제하여 완성하는 새로운 방식입니다.", "tip": "예상치 못한 조형성을 얻고 싶을 때 AI 결과물을 3D 모델링의 모티브로 삼으세요.", "keyword": "AI Co-Creation" },
            { "title": "고주사율 애니메이션 (120Hz+)", "desc": "최신 디스플레이에 최적화된, 극도로 부드럽고 미세한 프레임 단위의 애니메이션입니다.", "tip": "끊김 없는 매끄러운 움직임으로 사용자에게 프리미엄한 바이브를 전달하세요.", "keyword": "Fluid Motion" }
        ],
        "aesthetic_keyword": [
            { "title": "프루티거 아로라 (Aurora)", "desc": "프루티거 에어로의 맑은 감성에 오로라 같은 몽환적 빛의 번짐을 더한 미학입니다.", "tip": "여름 쿨 팔레트에 블러(Blur) 효과를 중첩해 영롱함을 극대화하세요.", "keyword": "Ethereal Glow" },
            { "title": "솔라펑크 (Solarpunk)", "desc": "기술과 자연이 공존하는 낙관적이고 밝은 미래주의 미학입니다.", "tip": "하이테크한 UI에 식물의 곡선과 따뜻한 채광을 섞어 새로운 미래를 그리세요.", "keyword": "Green Future" },
            { "title": "카세트 퓨처리즘 (Cassette)", "desc": "80년대 아날로그 기술이 미래까지 이어졌다면 어땠을까 하는 상상력입니다.", "tip": "CRT 주사선 효과와 투박한 플라스틱 질감을 3D 작업에 녹여보세요.", "keyword": "Analog Future" },
            { "title": "리미널 스페이스 (Liminal)", "desc": "사람이 없어 익숙한 장소가 낯설고 기묘하게 느껴지는 전이적 공간 미학입니다.", "tip": "3D 배경 제작 시 '정적'과 '불안함'이 공존하는 묘한 분위기를 연출할 때 참고하세요.", "keyword": "Uncanny Space" },
            { "title": "맥블링 (McBling)", "desc": "Y2K보다 더 화려하고 반짝이는 큐빅, 핑크, 화려한 로고가 강조된 키치 미학입니다.", "tip": "화려함의 끝을 달리는 '힙한 공주님' 같은 작업을 할 때 이 키워드를 쓰세요.", "keyword": "Glittery Kitsch" },
            { "title": "위어드코어 (Weirdcore)", "desc": "저해상도 이미지와 초현실적 텍스트로 불안과 호기심을 동시에 자극합니다.", "tip": "일부러 깨진 이미지와 엉뚱한 위치의 텍스트로 시선을 뺏어보세요.", "keyword": "Surreal Low-fi" },
            { "title": "기업적 초현실주의", "desc": "딱딱한 기업 이미지에 초현실적 상황이나 오브제를 섞어 위트를 주는 스타일입니다.", "tip": "정갈한 레이아웃 속에 아주 생뚱맞은 3D 오브젝트 하나를 배치해 긴장감을 주어 보세요.", "keyword": "Wit & Logic" },
            { "title": "글로벌 빌리지 커피하우스", "desc": "90년대 초반의 유기적 곡선, 에스닉 문양, 따뜻한 흙색이 공존하는 미학입니다.", "tip": "너무 차가운 디지털 감성에서 벗어나 포근하고 인간적인 무드를 낼 때 활용하세요.", "keyword": "90s Organic" },
            { "title": "플라스틱코어 (Plasticcore)", "desc": "인공적 광택, 비비드 컬러, 장난감 같은 매끄러운 플라스틱 질감의 미학입니다.", "tip": "C4D 렌더링 시 거칠기(Roughness)를 0으로 설정해 인위적인 아름다움을 강조하세요.", "keyword": "Artificial Gloss" },
            { "title": "바이오-디자인 (Bio-Design)", "desc": "세포 조직이나 곰팡이 균사체 등 생물학적 구조에서 영감을 받은 기괴한 형태입니다.", "tip": "기하학적 형태 대신 스스로 자라나는 듯한 비정형적 3D 모델링을 시도해 보세요.", "keyword": "Growing Form" },
            { "title": "글리치-고딕 (Glitch-Gothic)", "desc": "어두운 중세 고딕 미학과 현대의 디지털 오류(Glitch)가 결합된 날카로운 감성입니다.", "tip": "뾰족한 서체와 깨진 텍스처를 활용해 차가운 디지털 무드를 만들어 보세요.", "keyword": "Dark Tech Error" },
            { "title": "파스텔-브루탈리즘", "desc": "브루탈리즘의 거친 구조에 부드러운 파스텔 톤을 입힌 반전의 미학입니다.", "tip": "강력한 조형물에 부드러운 '여름 쿨' 컬러를 입혀 부드러운 카리스마를 연출하세요.", "keyword": "Soft Concrete" },
            { "title": "데이터-펑크 (Data-punk)", "desc": "정보 과부하, 복잡한 코드, 끊임없이 흐르는 텍스트가 압도적인 미학입니다.", "tip": "화면을 가득 채우는 데이터 스트리밍 시각화로 하이테크한 전문성을 보여주세요.", "keyword": "Info Overload" },
            { "title": "젠-모던 (Zen-Modern)", "desc": "동양의 선 사상과 모더니즘이 만나 극도의 절제와 평온을 추구하는 미학입니다.", "tip": "최소한의 요소와 넓은 여백으로 사용자의 마음을 편안하게 만드는 UI를 설계하세요.", "keyword": "Calm Geometry" },
            { "title": "네오-파간 (Neo-Pagan)", "desc": "고대 기호나 마법진을 현대적인 그래픽 언어로 재해석한 신비로운 무드입니다.", "tip": "로고 디자인에 신비로운 기하학적 상징을 넣어 독특한 서사를 부여해 보세요.", "keyword": "Mystic Graphic" },
            { "title": "디지털-내추럴리즘", "desc": "알고리즘을 통해 파도의 움직임이나 식물의 성장을 디지털로 완벽히 모사합니다.", "tip": "자연의 불규칙성을 수학적 코드로 구현해 인공적인 아름다움의 정수를 보여주세요.", "keyword": "Algo-Nature" },
            { "title": "소프트-서리얼리즘", "desc": "꿈속 풍경처럼 모든 것이 녹아내리거나 떠다니는 부드러운 초현실주의입니다.", "tip": "중력을 무시한 오브젝트 배치와 몽환적인 그라데이션을 조합해 보세요.", "keyword": "Melting Dream" },
            { "title": "테크노-노스탤지어", "desc": "초창기 컴퓨터 OS의 아이콘, 낮은 비트의 사운드 등 초기 디지털 기술에 대한 향수입니다.", "tip": "최신 웹 기술 위에 옛날 윈도우 창 디자인을 얹는 등 위트 있는 UI를 시도해 보세요.", "keyword": "Early Digital" },
            { "title": "하이퍼-페미닌 (Hyper-Fem)", "desc": "리본, 핑크, 곡선 등 전통적인 여성성을 극단적으로 강조해 새로운 힘으로 치환합니다.", "tip": "강렬한 핑크와 부드러운 레이스 질감을 정교하게 구현해 힙한 에너지를 뿜어내세요.", "keyword": "Bold Pink" },
            { "title": "미니멀-고딕 (Minimal-Gothic)", "desc": "고딕의 어두운 분위기를 얇은 선과 극도의 여백으로 세련되게 풀어낸 미학입니다.", "tip": "가느다란 세리프 폰트와 블랙/화이트만으로 압도적인 아우라를 만드세요.", "keyword": "Thin Darkness" },
            { "title": "사이버-요정 (Cyber-Fairy)", "desc": "요정의 날개 같은 유기적 형태와 금속성 크롬 질감이 만난 하이테크 판타지입니다.", "tip": "나비 형상을 3D 크롬 재질로 렌더링해 신비로운 미래적 오브제를 만들어 보세요.", "keyword": "Chrome Wing" }
        ]
    };


    const currentKnowledgeIndices = {
        'design_history_concepts': -1,
        'design_trend': -1,
        'aesthetic_keyword': -1
    };

    function getNextRandomIndex(category) {
        const data = knowledgeData[category];
        if (!data) return 0;
        let newIndex;
        // Keep picking a random index until it's different from the current one
        // If there's only one item, just return that index
        if (data.length <= 1) return 0;
        
        do {
            newIndex = Math.floor(Math.random() * data.length);
        } while (newIndex === currentKnowledgeIndices[category]);
        
        currentKnowledgeIndices[category] = newIndex;
        return newIndex;
    }

    function createKnowledgeCardHTML(item) {
        return `
            <div class="knowledge-card fade-in">
                <h3 class="knowledge-title">${item.title}</h3>
                <p class="knowledge-desc">${item.desc}</p>
                <div class="knowledge-tip">
                    <div class="tip-label">
                        <i class="ph-fill ph-lightbulb"></i>
                        <span>배움 한 조각</span>
                    </div>
                    <p class="tip-content">${item.tip}</p>
                </div>
                <div class="knowledge-footer">
                    <span class="keyword-tag"># ${item.keyword}</span>
                </div>
            </div>
        `;
    }

    function displayRandomKnowledge(animate = false) {
        const slots = [
            { category: 'design_history_concepts', target: 'card-history' },
            { category: 'design_trend', target: 'card-trend' },
            { category: 'aesthetic_keyword', target: 'card-aesthetic' }
        ];

        slots.forEach(slot => {
            const container = document.getElementById(slot.target);
            if (!container) return;

            if (animate) {
                const currentCard = container.querySelector('.knowledge-card');
                if (currentCard) {
                    currentCard.classList.add('refresh-out');
                    
                    // After fade out, replace content and fade back in
                    setTimeout(() => {
                        const newIndex = getNextRandomIndex(slot.category);
                        container.innerHTML = createKnowledgeCardHTML(knowledgeData[slot.category][newIndex]);
                    }, 300);
                } else {
                    const newIndex = getNextRandomIndex(slot.category);
                    container.innerHTML = createKnowledgeCardHTML(knowledgeData[slot.category][newIndex]);
                }
            } else {
                const newIndex = getNextRandomIndex(slot.category);
                container.innerHTML = createKnowledgeCardHTML(knowledgeData[slot.category][newIndex]);
            }
        });
    }

    const btnRefresh = document.getElementById('btn-refresh');
    if (btnRefresh) {
        btnRefresh.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Icon spin animation
            const icon = btnRefresh.querySelector('i');
            icon.classList.remove('spinning');
            void icon.offsetWidth; // Force reflow
            icon.classList.add('spinning');
            
            // Display new random knowledge with animation
            displayRandomKnowledge(true);
            
            setTimeout(() => {
                icon.classList.remove('spinning');
            }, 600);
        });

        // Initial load without logic animation but with entry animation
        displayRandomKnowledge(false);
    }
});
