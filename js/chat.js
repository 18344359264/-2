$(function () {


    //  点击发送
    $("#btnSend").on("click", function () {

        let text = $("#ipt").val().trim()
        if (text.length <= 0) return $("#ipt").val("")

        $("#talk_list").append(`<li class="right_word">
          <img src="img/person02.png" /> <span>${text}</span>
        </li>`);

        $("#ipt").val("");
        resetui();
        $("#ipt").focus();

        getMsg(text);


    });

    // 获取信息内容
    function getMsg(text) {
        $.ajax({

            method: "get",
            url: "http://www.liulongbin.top:3006/api/robot",
            data: {
                spoken: text,
            },

            success: function (s) {
                if (s.message == "success") {

                    $("#talk_list").append(`<li class="left_word"><img src="img/person01.png" /> <span>${s.data.info.text}</span>  </li>`);

                    resetui();

                    getVoice(s.data.info.text)
                }

            }
        })
    }


    // 获取语音

    function getVoice(text) {
        $.ajax({
            method: "get",
            url: "http://www.liulongbin.top:3006/api/synthesize",
            data: {
                text: text,
            },
            success: function (s) {
                if (s.status == 200) {
                    $("#voice").attr("src", s.voiceUrl)

                    console.log(s.voiceUrl);
                }
            }
        })
    }

    //   回车发送
    $("#ipt").on("keyup", function (k) {

        if (k.keyCode == 13) $("#btnSend").click()

    })
    // 任意地方回车给输入框选中
    $("body").on("keyup", function (k) {

        if (k.keyCode == 13) $("#ipt").focus()
    })



})

