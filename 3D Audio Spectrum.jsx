/*  3D Audio React Script for After Effects
    Copyright (C) 2017 dsa28s <leeshoon1344@gmail.com / dsa28s@naver.com>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var myShapeLayer;
var loadingText;
var mainComp;
var kopubFont;

function audio_spectrum_by_sangs(stage) { 
    kopubFont = "KoPubDotum Bold";
    var isContinue = 1;

    if(system.osName == "MacOS") {
        kopubFont = "KoPubDotum_Pro";  
    } else {
        if(app.isoLanguage == "en_US") {
             kopubFont = "KoPubDotum Bold";
        }
    }

    var loadingComp = app.project.items.addComp("잠시만 기다려주세요!", 1920, 1080, 1, 300, 29.97);
    
    myShapeLayer = loadingComp.layers.addShape();
    var shapeGroup = myShapeLayer.property("Contents").addProperty("ADBE Vector Group");
    var myEllipse = shapeGroup.property("Contents").addProperty("ADBE Vector Shape - Rect");
    myEllipse.property("Size").setValue([1920, 200]);
    var myFill = shapeGroup.property("Contents").addProperty("ADBE Vector Graphic - Fill");
    myFill.property("ADBE Vector Fill Color").setValue([0.21, 0.47, 0.1]);
    //myFill.property("Opacity").setValue([100]);

    loadingText = loadingComp.layers.addText("잠시만 기다려주세요...!\n3D Audio React 스크립트가 필수 구성요소를 배치중이랍니다~");
    loadingText.property("Position").setValue([960, 532]);
    
    var textProp = loadingText.property("Source Text");
    var textDocument = textProp.value;

    textDocument.resetCharStyle();
    textDocument.justification = ParagraphJustification.CENTER_JUSTIFY;
    textDocument.fontSize = 40;
    textDocument.font = kopubFont;
    textDocument.fillColor = [1, 1, 1];
    textDocument.strokeColor = [1, 1, 1];

    textProp.setValue(textDocument);
    loadingComp.openInViewer();

    var musicComp = app.project.items.addComp("음악~~", 1920, 1080, 1, 300, 29.97);
    alert("확인 버튼을 누른 후 음악 파일을 선택합니다!");
    var musicFile = app.project.importFileWithDialog();
    musicComp.layers.add(musicFile[0]);
    $.sleep(1000);
    var sourceComp = app.project.items.addComp("소스 영상!!~~", 1920, 1080, 1, 300, 29.97);
    alert("확인 버튼을 누른 후 소스(사용할 영상) 파일을 선택합니다!");
    var sourceFile = app.project.importFileWithDialog();
    sourceComp.duration = sourceFile[0].duration;
    //alert(sourceFile[0].duration);
    sourceComp.layers.add(sourceFile[0]);
    var internalAudioSpectrumComp = app.project.items.addComp("막대기", 1920, 1080, 1, 300, 29.97);

    var internalFolder = app.project.items.addFolder("손대지 마세요!!");
    internalAudioSpectrumComp.parentFolder = internalFolder;
    internalAudioSpectrumComp.layers.add(musicComp);

    var spectrum = internalAudioSpectrumComp.layers.addSolid([236, 0, 136], "AudioSpectrum", 1920, 1080, 1, 300);
    spectrum.Effects.addProperty("Audio Spectrum");

    internalAudioSpectrumComp.layer("AudioSpectrum")("Effects")("Audio Spectrum")("Audio Layer").setValue(2);
    internalAudioSpectrumComp.layer("AudioSpectrum")("Effects")("Audio Spectrum")("Start Frequency").setValue(100);
    internalAudioSpectrumComp.layer("AudioSpectrum")("Effects")("Audio Spectrum")("End Frequency").setValue(400);
    internalAudioSpectrumComp.layer("AudioSpectrum")("Effects")("Audio Spectrum")("Frequency bands").setValue(40);
    internalAudioSpectrumComp.layer("AudioSpectrum")("Effects")("Audio Spectrum")("Maximum Height").setValue(4000);
    internalAudioSpectrumComp.layer("AudioSpectrum")("Effects")("Audio Spectrum")("Thickness").setValue(2);
    internalAudioSpectrumComp.layer("AudioSpectrum")("Effects")("Audio Spectrum")("Inside Color").setValue([255, 255, 255]);
    internalAudioSpectrumComp.layer("AudioSpectrum")("Effects")("Audio Spectrum")("Outside Color").setValue([255, 255, 255]);
    internalAudioSpectrumComp.layer("AudioSpectrum")("Effects")("Audio Spectrum")("Side Options").setValue("1");
    
    spectrum.Effects.addProperty("Minimax");
    internalAudioSpectrumComp.layer("AudioSpectrum")("Effects")("Minimax")("Radius").setValue("5");
    
    spectrum.Effects.addProperty("Add Grain");
    
    spectrum.Effects.addProperty("Fill");
    internalAudioSpectrumComp.layer("AudioSpectrum")("Effects")("Fill")("Color").setValue([255, 255, 255]);
    
    spectrum.Effects.addProperty("Glow");

    mainComp = app.project.items.addComp("3D Audio Spectrum", 1920, 1080, 1, 300, 29.97);
    mainComp.layers.add(musicComp);
    mainComp.layers.add(sourceComp);
    mainComp.layers.add(internalAudioSpectrumComp);
    
    mainComp.openInViewer();
    loadingComp.remove();
    
    myShapeLayer = mainComp.layers.addShape();
    var shapeGroup = myShapeLayer.property("Contents").addProperty("ADBE Vector Group");
    var myEllipse = shapeGroup.property("Contents").addProperty("ADBE Vector Shape - Rect");
    myEllipse.property("Size").setValue([1920, 200]);
    var myFill = shapeGroup.property("Contents").addProperty("ADBE Vector Graphic - Fill");
    myFill.property("ADBE Vector Fill Color").setValue([0.21, 0.47, 0.1]);
    myFill.property("Opacity").setValue([50]);

    loadingText = mainComp.layers.addText("카메라 트래킹을 진행합니다...\n트래킹 완료 후 스크립트 패널 > 트래킹 완료 버튼을 눌러주세요.");
    loadingText.property("Position").setValue([960, 532]);
    
    var textProp = loadingText.property("Source Text");
    var textDocument = textProp.value;

    textDocument.resetCharStyle();
    textDocument.justification = ParagraphJustification.CENTER_JUSTIFY;
    textDocument.fontSize = 40;
    textDocument.font = kopubFont;
    textDocument.fillColor = [1, 1, 1];
    textDocument.strokeColor = [1, 1, 1];

    textProp.setValue(textDocument);
    
    mainComp.layer("소스 영상!!~~")("Effects").addProperty("3D Camera Tracker");
    mainComp.layer("소스 영상!!~~")("Effects")("3D Camera Tracker")("Shot Type").setValue("4");
    mainComp.layer("소스 영상!!~~")("Effects")("3D Camera Tracker")("Detailed Analysis").setValue("1");
    
    mainComp.layer("막대기").threeDLayer = true;
}   

function stage2() {
      loadingText.remove();
      myShapeLayer.remove();
      
      myShapeLayer = mainComp.layers.addShape();
    var shapeGroup = myShapeLayer.property("Contents").addProperty("ADBE Vector Group");
    var myEllipse = shapeGroup.property("Contents").addProperty("ADBE Vector Shape - Rect");
    myEllipse.property("Size").setValue([1920, 700]);
    var myFill = shapeGroup.property("Contents").addProperty("ADBE Vector Graphic - Fill");
    myFill.property("ADBE Vector Fill Color").setValue([0.21, 0.47, 0.1]);
    myFill.property("Opacity").setValue([75]);

    loadingText = mainComp.layers.addText("오디오 스펙트럼을 넣고 싶은 곳의 트래커 점을 선택(영역지정)한 후\n오른쪽 마우스 클릭 > Null 오브젝트 추가를 눌러주세요.\n\n그 후 현재 컴포지션의 '막대기' 컴포지션을 Null 개체와 링크(모기향 모양) 시켜주세요!\n\n만약 텍스트를 추가하고 싶으시다면 텍스트 추가 후 Null 개체와 연결시켜주세요.\n\n\n마지막으로 XYZ위치 조정하시면 끝!\n(해당 알림화면은 레이어 숨기기로 해주세요! 그래야 방법을 계속해서 볼 수 있으니까요 :)");
    loadingText.property("Position").setValue([960, 340]);
    
    var textProp = loadingText.property("Source Text");
    var textDocument = textProp.value;

    textDocument.resetCharStyle();
    textDocument.justification = ParagraphJustification.CENTER_JUSTIFY;
    textDocument.fontSize = 40;
    textDocument.font = kopubFont;
    textDocument.fillColor = [1, 1, 1];
    textDocument.strokeColor = [1, 1, 1];

    textProp.setValue(textDocument);
}

function myScript(thisObj) {
          function myScript_buildUI(thisObj) {
                    var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "3D Audio React by MR.LEE(상훈)", [0, 0, 300, 300]);
 
                    res="group{orientation:'column', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'],\
                              myStaticText: StaticText{text:'3D Audio React 스크립트 v 1.0'},\
                              information1: StaticText{text:'한국디지털미디어고등학교 2학년 평범한 학생 + 개발자'},\
                              information2: StaticText{text:'이상훈 (leeshoon1344@gmail.com)'},\
                              firstStepPanel: Panel{text:'1단계 : 초기작업', orientation:'column', alignChildren:['fill', 'fill'],\
                                        startFirstStepButton: Button{text:'음악 및 소스영상 불러오기'},\
                                        informationFirstStepPanelLabel: StaticText{text:'위 버튼을 누르면 음악 파일과 영상을 불러온 후에 스크립트가 자동으로 컴포지션도 생성하고 표현식도 넣고 그런데요...'},\
                              },\
                              secondStepPanel: Panel{text:'2단계 : 트래커 카메라 추가하기', orientation:'column', alignChildren:['fill', 'fill'],\
                                        startSecondStepButton: Button{text:'트래킹 완료!'},\
                              },\
                              thirdStepPanel: Panel{text:'3단계 : 위치조정하기', orientation:'column', alignChildren:['fill', 'fill'],\
                                        informationThirdStepPanelLabel: StaticText{text:'이제 이 스크립트가 할 일은 끝난거같아요! 많이 허접했습니다...ㅎ'},\
                                        informationThirdStepPanelLabel2: StaticText{text:'그래도 관심가져주셔서 감사드리고 이게 저의 첫 스크립트였어요!'},\
                                        informationThirdStepPanelLabel3: StaticText{text:'앞으로도 더 열심히 공부해서 좋은 스크립트로 찾아뵐게요!'},\
                              },\
                    }"
 
                    myPanel.grp = myPanel.add(res);
                    
                    myPanel.grp.firstStepPanel.startFirstStepButton.onClick = function() {
                            audio_spectrum_by_sangs();
                    }    
                
                    myPanel.grp.secondStepPanel.startSecondStepButton.onClick = function() {
                            stage2();
                    }    
 
                    myPanel.layout.layout(true);
                    myPanel.grp.minimumSize = myPanel.grp.size;
                    myPanel.layout.resize();
                    myPanel.onResizing = myPanel.onResize = function () {this.layout.resize();}
 
                    return myPanel;
          }
 
 
          var myScriptPal = myScript_buildUI(thisObj);
 
 
          if ((myScriptPal != null) && (myScriptPal instanceof Window)) {
                    myScriptPal.center();
                    myScriptPal.show();
                    }
          }
 
 
          myScript(this);
