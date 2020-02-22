import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, ScrollView, Alert } from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

class AgreementReview extends React.Component {
    state = {
        
    }

    render(){
        return( 
            <View style={styles.container}>
                <View style={styles.headerContainter}>
                    <TouchableOpacity style={styles.backArrowContainer} onPress={() => this.props.navigation.goBack(null)}>
                        <Image style={styles.backArrow} source={require('../images/backArrow.png')}/>
                    </TouchableOpacity>
                    <Text style={styles.headerFont}>핑거픽 이용약관</Text>
                    <View style={styles.fillerContainer}/>
                </View>  
                <ScrollView contentContainerStyle={styles.agreementContainer}>
                    <Text style={styles.title}>이용 약관</Text>
                    <Text/>
                    <Text>핑거픽에 오신 것을 환영합니다!</Text>
                    <Text/>
                    <Text>본 약관은 회원님의 핑거픽 이용에 적용되며, 아래 설명된 핑거픽 서비스에 관한 정보를 제공합니다. 회원님이 핑거픽 계정을 만들거나 핑거픽을 이용하면 회원님은 본 약관에 동의하는 것입니다.</Text>
                    <Text/>
                    <Text style={styles.title}>핑거픽 서비스</Text>
                    <Text/>
                    <Text>당사는 회원님에게 핑거픽 서비스를 제공하는 것에 동의합니다. 서비스에는 당사가 핑거픽의 사명을 실현하기 위해 제공하는 모든 핑거픽 제품, 기능, 앱, 서비스, 기술 및 소프트웨어가 포함됩니다. 회원님이 관심 있는 사람들과 항목을 더 가까이 접할 수 있도록 서비스는 다음과 같은 요소(서비스)로 구성됩니다.</Text>
                    <Text/>
                    <Text style={styles.bold}><Text style={styles.bullet}> {`\u2022`} </Text> 창작, 연결, 커뮤니케이션, 발견 및 공유를 위한 맞춤화된 기회를 제공합니다.</Text>
                    <Text>사람들은 다양합니다. 당사는 회원님이 실제로 관심을 가지는 경험을 공유함으로써 관계를 강화하길 원합니다. 따라서 당사는 회원님 및 다른 사람들이 관심 있는 사람과 사항을 파악하는 시스템을 구축하고 파악한 정보를 이용함으로써 회원님에게 중요한 경험을 창작하고, 발견하며, 동참하고, 공유하도록 합니다. 그 일환으로, 회원님 및 다른 사람들이 핑거픽 안팎에서 하는 활동에 기초하여 회원님이 관심을 가질 만한 콘텐츠, 기능, 제안 및 계정을 더 잘 보여드리고, 회원님에게 핑거픽을 경험하는 방법을 제안하기도 합니다.</Text>
                    <Text style={styles.bold}><Text style={styles.bullet}> {`\u2022`} </Text> 긍정적이고 포괄적이며 안전한 환경을 조성합니다.</Text>
                    <Text>당사는 핑거픽 커뮤니티 회원들이 도움을 필요로 한다고 생각하는 경우를 포함하여 회원들의 경험이 긍정적이고 포괄적일 수 있도록 도구를 개발하고 사용하고, 자원을 제공합니다. 또한 당사는 핑거픽 약관 및 정책의 남용 및 위반을 포함하여 유해하고 사기적인 행위를 방지하기 위한 팀과 시스템을 갖추고 있습니다. 당사는 핑거픽 플랫폼의 보안을 유지하기 위해 당사가 보유한 모든 정보(회원님의 정보 포함)를 이용합니다.</Text>
                    <Text style={styles.bold}><Text style={styles.bullet}> {`\u2022`} </Text> 성장하고 있는 핑거픽 커뮤니티에 지속적으로 서비스를 제공하는 데 도움이 되는 기술을 개발하고 사용합니다.</Text>
                    <Text>성장하고 있는 핑거픽 커뮤니티를 위해 정보를 구성하고 분석하는 것이 핑거픽 서비스의 핵심입니다. 핑거픽 서비스에서 큰 부분을 차지하는 것은 광범위한 글로벌 커뮤니티를 위하여 엄청나게 큰 규모로 핑거픽 서비스를 맞춤화하고, 보호하며, 향상시키는 데 도움이 되는 첨단 기술을 개발하고 사용하는 것입니다. 인공 지능 및 머신 러닝과 같은 기술은 저희가 핑거픽 서비스 전체에 복잡한 프로세스를 적용할 수 있게 합니다. 자동화 기술 또한 핑거픽 서비스의 기능성과 무결성 보장에 기여합니다.</Text>
                    <Text style={styles.bold}><Text style={styles.bullet}> {`\u2022`} </Text> 연구 및 혁신.</Text>
                    <Text>당사는 보유한 정보를 이용하여 핑거픽 서비스를 연구하고, 다른 사람들과 협력하여 보다 나은 핑거픽 서비스를 만들고 핑거픽 커뮤니티의 복지에 기여하기 위한 연구를 수행합니다.</Text>
                    <Text/>
                    <Text/>
                    <Text style={styles.title}>데이터 정책</Text>
                    <Text/>
                    <Text>핑거픽 서비스를 제공하기 위해서는 회원님의 정보를 수집하고 이용해야 합니다. 또한  핑거픽 개인정보를 포함해 회원님의 정보를 관리할 수 있는 여러 방법에 대해 설명합니다. 핑거픽을 이용하려면 데이터 정책에 동의해야 합니다.</Text>
                    <Text/>
                    <Text/>
                    <Text style={styles.title}>회원님의 약속</Text>
                    <Text/>
                    <Text>핑거픽 서비스 제공에 대한 당사의 약속에 대해 회원님은 다음과 같은 약속을 해야 합니다. <Text style={styles.bold}>핑거픽을 이용할 수 있는 주체. </Text>당사는 핑거픽 서비스가 가능한 개방적이고 포괄적인 서비스가 되기를 원하지만, 본 서비스가 안전하고, 보안성을 갖추며, 법을 준수하는 서비스가 되기를 원하기도 합니다. 따라서 회원님이 핑거픽 커뮤니티에 참여하려면 몇 가지 제한 사항을 준수해야 합니다.</Text>
                    <Text/>
                    <Text><Text style={styles.bullet}> {`\u2022`} </Text> 만 14세 이상이어야 합니다</Text>
                    <Text><Text style={styles.bullet}> {`\u2022`} </Text> 챌린지 참여 이미지는 반드시 회원님의 창작물이어야 합니다.</Text>
                    <Text><Text style={styles.bullet}> {`\u2022`} </Text> 관련 법률에 따라 핑거픽 서비스를 받는 것이 일부라도 금지된 사람 또는 관련 제재 대상 명단에 있어 결제 관련 핑거픽 서비스를 이용하는 것이 금지된 사람이 아니어야 합니다.</Text>
                    <Text><Text style={styles.bullet}> {`\u2022`} </Text> 과거에 당사가 회원님의 계정을 법률 또는 핑거픽 정책 위반을 이유로 하여 비활성화하지 않았어야 합니다.</Text>
                    <Text><Text style={styles.bullet}> {`\u2022`} </Text> 유죄가 확정된 성범죄자가 아니어야 합니다.</Text>
                    <Text/>
                    <Text><Text style={styles.bold}>핑거픽을 사용할 수 없는 경우. </Text>광범위한 커뮤니티에 안전하고 개방적인 핑거픽 서비스가 제공되기 위해서는 우리 모두가 각자의 본분을 다해야 합니다.</Text>
                    <Text/>
                    <Text style={styles.bold}><Text style={styles.bullet}> {`\u2022`} </Text> <Text style={styles.bold}> 다른 사람을 사칭하거나 부정확한 정보를 제공하면 안 됩니다.</Text></Text>
                    <Text>핑거픽에서 회원님의 신원을 공개할 필요는 없지만 정확한 최신 정보(등록 정보 포함)를 제공해야 합니다. 또한 본인이 아닌 다른 사람을 사칭해서는 안 되며, 다른 사람의 명시적인 허락 없이 다른 사람의 이름으로 계정을 만들면 안 됩니다.</Text>
                    <Text style={styles.bold}><Text style={styles.bullet}> {`\u2022`} </Text> 불법적이거나, 오해의 소지가 있거나, 사기적인 행위 또는 불법적이거나 허가받지 않은 목적을 위한 어떠한 행위도 하면 안 됩니다.</Text>
                    <Text style={styles.bold}><Text style={styles.bullet}> {`\u2022`} </Text> 핑거픽 서비스의 정상적인 운영을 방해하거나 지장을 주는 어떠한 일도 해서는 안 됩니다.</Text>
                    <Text style={styles.bold}><Text style={styles.bullet}> {`\u2022`} </Text> 허가받지 않은 방법으로 계정을 만들거나 정보에 접근하거나 정보를 수집하려 해서는 안 됩니다.</Text>
                    <Text>여기에는 당사의 명시적 허락 없이 자동화된 방법으로 계정을 만들거나 정보를 수집하는 것이 포함됩니다.</Text>
                    <Text style={styles.bold}><Text style={styles.bullet}> {`\u2022`} </Text> 회원님의 계정 일부(사용자 이름 포함)를 구입, 판매 또는 양도하거나, 다른 사용자의 로그인 정보 또는 배지를 요청, 수집 또는 사용하려고 시도해서는 안 됩니다.</Text>
                    <Text style={styles.bold}><Text style={styles.bullet}> {`\u2022`} </Text> 개인 정보 또는 기밀 정보를 게시하거나 지적 재산을 포함한 타인의 권리를 침해하는 어떠한 행위도 해서는 안 됩니다.</Text>
                    <Text style={styles.bold}><Text style={styles.bullet}> {`\u2022`} </Text> 당사의 사전 서면 동의 없이 회원님의 사용자 이름에 도메인 이름이나 URL을 사용하면 안 됩니다.</Text>
                    <Text/>
                    <Text><Text style={styles.bold}>회원님이 당사에 부여한 권한. </Text>본 계약의 일부로서, 회원님은 당사가 회원님에게 핑거픽 서비스를 제공하기 위해 필요로 하는 권한을 함께 부여합니다.</Text>
                    <Text/>
                    <Text style={styles.bold}><Text style={styles.bullet}> {`\u2022`} </Text> 당사는 회원님의 콘텐츠에 대한 소유권을 주장하지 않지만 회원님은 당사에 회원님의 콘텐츠를 이용할 라이선스를 부여합니다.</Text>
                    <Text>회원님의 콘텐츠에 대한 회원님의 권리에 있어 변경되는 사항은 없습니다. 당사는 회원님이 핑거픽 서비스에 또는 핑거픽 서비스를 통해 게시하는 콘텐츠에 대해 소유권을 주장하지 않습니다. 그 대신 회원님이 지적 재산권(사진 또는 동영상 등)이 적용되는 콘텐츠 또는 당사 서비스와 관련된 콘텐츠를 공유, 게시 또는 업로드할 때 회원님은 콘텐츠를 전 세계적으로 호스팅, 사용, 배포, 수정, 실행, 복사, 공개적으로 수행 또는 표시, 번역 및 파생 저작물을 생성할 수 있는 비독점적이고 양도 가능하며 2차 허가권을 가질 수 있고 사용료가 없는 허가권을 당사에 부여합니다(회원님의 개인정보 취급방침 및 애플리케이션 설정과 일치함). 이러한 라이선스는 핑거픽 서비스에 접속하고 이를 이용하는 회원님 및 다른 사람들에게 핑거픽 서비스 이용을 가능하게 하기 위한 것입니다. 콘텐츠 또는 계정을 삭제하여 언제든지 이러한 허가권을 종료할 수 있습니다. 단, 회원님의 콘텐츠를 공유한 타인이 해당 콘텐츠를 삭제하지 않았을 경우에는 해당 콘텐츠가 계속 보일 수 있습니다.</Text>
                    <Text style={styles.bold}><Text style={styles.bullet}> {`\u2022`} </Text> 회원님의 사용자 이름, 프로필 사진 및 회원님의 관계 및 행동에 관한 정보를 계정, 광고 및 홍보 콘텐츠에 이용할 수 있는 권한.</Text>
                    <Text>회원님은 당사에 회원님의 사용자 이름, 프로필 사진 및 회원님의 활동(예: "좋아요") 또는 관계(예: "팔로우")에 관한 정보를 핑거픽 제품 전반에 표시되는 계정, 광고, 제안 및 회원님이 팔로우하거나 참여하는 기타 홍보 콘텐츠와 함께 또는 이와 관련하여 표시할 수 있는 권한을 무상으로 부여합니다. 예를 들어, 당사는 회원님이 핑거픽에 유료로 광고를 게재하는 브랜드의 홍보 게시물을 좋아했다는 점을 표시할 수 있습니다. 다른 콘텐츠에서의 행동 및 다른 계정의 팔로우와 마찬가지로, 홍보 콘텐츠에서의 행동 및 홍보 계정의 팔로우도 해당 콘텐츠나 팔로우를 볼 수 있는 권한이 있는 사람들에게만 표시됩니다. 당사는 회원님의 광고 설정도 존중합니다.</Text>
                    <Text style={styles.bold}><Text style={styles.bullet}> {`\u2022`} </Text> 회원님은 당사가 회원님의 기기에 핑거픽 서비스 업데이트를 다운로드하고 설치할 수 있다는 것에 동의합니다.</Text>
                    <Text/>
                    <Text/>
                    <Text style={styles.title}>당사가 보유하는 추가적인 권리</Text>
                    <Text/>
                    <Text><Text style={styles.bullet}> {`\u2022`} </Text> 회원님의 계정을 위해 사용자 이름 또는 이와 유사한 식별자를 선정할 경우, 당사는 적절하거나 필요하다고 판단될 경우 이를 변경할 수 있습니다(예: 타인의 지적 재산권을 침해하거나 다른 사용자를 사칭하는 경우).</Text>
                    <Text><Text style={styles.bullet}> {`\u2022`} </Text> 당사가 소유하고 핑거픽 서비스 내에서 사용하도록 한 지적 재산권의 적용을 받는 콘텐츠(예: 저희로부터 제공받아 회원님이 생성하거나 공유하는 콘텐츠에 추가되는 사진, 디자인, 동영상 또는 사운드)를 회원님이 사용하는 경우, 당사는 해당 콘텐츠에 대해 모든 권리를 보유하되 회원님 고유의 콘텐츠에 대한 권리를 보유하지는 않습니다.</Text>
                    <Text><Text style={styles.bullet}> {`\u2022`} </Text> 회원님은 당사의 사전 서면 허락을 통해 명백하게 허락을 받은 경우에만 당사의 지적 재산권 및 상표 또는 비슷한 상표를 사용할 수 있습니다.</Text>
                    <Text><Text style={styles.bullet}> {`\u2022`} </Text> 회원님이 당사의 소스코드를 수정하거나, 소스코드에 대한 파생물을 제작하거나, 소스코드를 역컴파일하거나 기타 방법으로 소스코드 추출을 시도하기 위해서는 당사의 서면 허락 또는 오픈 소스 라이선스에 의거한 허락을 받아야 합니다.</Text>
                    <Text/>
                    <Text/>
                    <Text style={styles.title}>콘텐츠 삭제 및 계정 비활성화 또는 해지</Text>
                    <Text/>
                    <Text><Text style={styles.bullet}> {`\u2022`} </Text> 회원님이 서비스에서 공유하는 콘텐츠나 정보가 본 약관, 당사 정책에 위배된다고 판단되거나 법에 따라 삭제해야 할 경우 삭제될 수 있습니다. 당사는 핑거픽 커뮤니티 또는 핑거픽 서비스를 보호하기 위해, 또는 회원님이 당사에 위험 또는 법적 문제를 일으키거나, 본 약관 또는 핑거픽 정책을 위반하거나, 다른 사람의 지적 재산권을 반복적으로 침해하거나, 법률에 따라 요구되거나 허용되는 경우에 회원님에게 서비스 전부 또는 일부를 제공하는 것을 즉시 중단하거나 거부할 수 있습니다. 당사가 회원님의 계정을 비활성화하거나 해지하는 조치를 취할 경우 적절할 때 회원님에게 알려드릴 것입니다. 회원님의 계정이 실수로 해지되었다고 생각되는 경우, 또는 회원님의 계정을 비활성화하거나 영구 삭제하고 싶은 경우에는 당사 메일 contact@droptheluggage.com으로 문의하십시오.</Text>
                    <Text><Text style={styles.bullet}> {`\u2022`} </Text> 삭제된 콘텐츠는 합리적인 기간 동안(일반적으로 90일) 백업 사본으로 존속될 수 있지만 이 기간 동안 다른 사용자에게 표시되지 않습니다. 단, 이에 불구하고, 법률, 정부 기관 또는 사법기관의 명령 등에 의하여 요구되는 경우, 당사는 이를 위하여 필요한 범위 내에서 해당 콘텐츠를 보유할 수 있습니다. 회원님이 삭제한 콘텐츠도 다른 사람이 이미 공유했을 경우 계속 표시됩니다. 이 절과 아래의 "계약 및 동의하지 않을 경우의 결과" 항은 회원님의 계정이 해지 또는 종료된 이후에도 계속 적용됩니다.</Text>
                    <Text/>
                    <Text/>
                    <Text style={styles.title}>계약 및 상호 의견이 합치되지 않는 경우</Text>
                    <Text/>
                    <Text style={styles.bold}>계약.</Text>
                    <Text/>
                    <Text><Text style={styles.bullet}> {`\u2022`} </Text> 본 계약의 일부가 집행 불능으로 판단되더라도 나머지 부분은 계속해서 효력을 갖습니다.</Text>
                    <Text><Text style={styles.bullet}> {`\u2022`} </Text> 본 계약의 개정이나 포기는 당사가 작성하고 서명한 서면으로만 가능합니다. 본 계약의 한 부분을 집행하지 못하더라도 포기로 간주되지는 않습니다.</Text>
                    <Text><Text style={styles.bullet}> {`\u2022`} </Text> 당사는 회원님에게 명시적으로 부여된 권한을 제외한 모든 권한을 보유합니다.</Text>
                    <Text/>
                    <Text/>
                    <Text style={styles.bold}>본 계약에 따른 권리 보유자.</Text>
                    <Text/>
                    <Text><Text style={styles.bullet}> {`\u2022`} </Text> 본 계약은 제삼자에게 권리를 부여하지 않습니다.</Text>
                    <Text><Text style={styles.bullet}> {`\u2022`} </Text> 본 계약에 따른 회원님의 권리나 의무는 당사의 동의 없이 타인에게 양도할 수 없습니다.</Text>
                    <Text><Text style={styles.bullet}> {`\u2022`} </Text> 당사의 권리와 의무는 타인에게 양도될 수 있습니다. 이러한 양도는 예를 들어 (인수합병이나 자산매각으로 인해) 당사의 소유권이 변경되는 경우 또는 법률에 의해 이뤄질 수 있습니다.</Text>
                    <Text/>
                    <Text/>
                    <Text style={styles.bold}>일이 발생할 경우의 책임자.</Text>
                    <Text/>
                    <Text><Text style={styles.bullet}> {`\u2022`} </Text> 당사 서비스는 "있는 그대로" 제공되며, 당사는 서비스가 안전하고 확실하게 제공되거나 항상 완벽하게 작동한다고 보장할 수 없습니다. 관련 법률이 허용하는 한도 내에서 당사는 상업성, 특정 목적을 위한 적합성, 권원 및 비침해성에 대한 묵시적인 보증을 포함하여 일체의 명시적 또는 묵시적 보증을 하지 않습니다.</Text>
                    <Text><Text style={styles.bullet}> {`\u2022`} </Text> 또한 당사는 사람들의 활동이나 말을 통제하지 않으며, 사람들(또는 회원님)의 활동이나 행동(온라인 또는 오프라인) 또는 콘텐츠(불법 또는 유해 콘텐츠 포함)에 대해 책임지지 않습니다. 또한 당사는 다른 사람이나 기업에서 제공하는 서비스와 기능에 대해서도 책임지지 않습니다. 회원님이 당사 서비스를 통해 이러한 서비스와 기능에 접속하더라도 마찬가지입니다.</Text>
                    <Text><Text style={styles.bullet}> {`\u2022`} </Text> 핑거픽 서비스에서 발생하는 모든 사항에 대한 당사의 책임은 법률이 허용하는 최대 한도로 제한됩니다. 핑거픽 서비스에 문제가 있는 경우, 당사는 해당 문제가 끼칠 수 있는 모든 가능한 영향을 알 수 없습니다. 회원님은 본 약관으로부터 또는 본 약관과 관련하여 발생하는 수익, 수입, 정보, 또는 데이터의 손실이나 파생적, 특수적, 간접적, 처벌적, 징벌적 또는 부수적 손해의 가능성을 알고 있더라도 이에 대해 책임지지 않는다는 것에 동의합니다. 여기에는 당사가 회원님의 콘텐츠, 정보 또는 계정을 삭제할 때도 포함됩니다.</Text>
                    <Text><Text style={styles.bullet}> {`\u2022`} </Text> 단, 이에 불구하고, 관련 법률에 따라서는 위에 규정된 책임에 대한 제한이나 면제가 허용되지 않을 수 있습니다. 이 경우, 당사는 해당 법률이 규정하고 있는 범위 내에서 책임을 부담합니다.</Text>
                    <Text/>
                    <Text/>
                    <Text style={styles.bold}>분쟁 해결 방법.</Text>
                    <Text/>
                    <Text>소비자의 경우 회원님이 거주하는 국가의 법률은 회원님의 모든 청구, 청구 사유 또는 본 약관과 관련하여 발생하는 분쟁(“청구”)에 적용되며, 회원님은 청구에 대한 관할권이 있는 해당 국가의 관할 법원에서 해당 청구를 해결할 수 있습니다. 다른 모든 경우에 회원님은 해당 청구가 미국에서 독점적으로 해결되어야 한다는 점에 동의합니다. 회원님은 해당 청구의 소송 목적에 대해 캘리포니아 북부 지방 법원 또는 샌 마테오 카운티에 위치한 주 법원 중 한 곳의 속인적 관할권에 따르며, 법 조항의 상충 여부와 관계없이 본 이용 약관 및 모든 청구에 캘리포니아 주법이 적용됩니다.</Text>
                    <Text/>
                    <Text style={styles.bold}>요청하지 않은 자료.</Text>
                    <Text/>
                    <Text>당사는 의견 및 제안을 언제든 환영하지만, 이를 어떠한 제한 또는 보상 의무 없이 활용할 수 있고, 이를 기밀로 유지할 의무가 없습니다.</Text>
                    <Text/>
                    <Text style={styles.title}>본 약관 업데이트</Text>
                    <Text/>
                    <Text>저희는 핑거픽 서비스 및 정책을 변경할 수 있고, 핑거픽 서비스 및 정책이 정확하게 반영되도록 하기 위해 본 약관을 변경해야 할 경우가 있습니다. 법적으로 달리 요구되지 않는 한, 저희는 본 약관을 변경하기 전에 회원님에게 알리고, 변경된 약관의 효력이 발생되기 최소 30일 전에 회원님에게 이를 검토할 기회를 제공할 것입니다. 변경 발효일 이후에도 회원님이 계속 핑거픽 서비스를 이용하실 경우, 회원님은 변경된 약관의 적용을 받게 됩니다.</Text>
                    <Text/>
                    <Text>개정: 2019년 11월 15일</Text>
                </ScrollView>              
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      alignItems: 'center',
      marginRight: 10,
      marginLeft: 10,
    },
    headerContainter: {
        paddingTop: 50,
        alignSelf: 'stretch',
        alignItems: 'center',
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0'
    },
    headerFont: {
        position: 'relative', 
        color: 'black', 
        fontSize: 20, 
        fontWeight: 'bold',
        marginLeft: -20
    },
    backArrowContainer: {
        marginLeft: 15,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    backArrow: {
        height: 25,
        width: 15,
        marginRight: 5
    },
    fillerContainer: {
        marginRight: 15
    },
    agreementContainer: {
        alignSelf: 'stretch',
        paddingBottom: 50,
        paddingTop: 10
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    bold: {
        fontWeight: 'bold'
    },
    bullet: {
        fontSize: 20
    }
    
  });

  export default AgreementReview;