function ValEntrada ()
{
	//var UCode = $("#tbUserCode").val();
	var UName = $("#tbUserName").val();
	var UPwd  = $("#tbUserPassWord").val();
	
	UName = UName.toUpperCase();
	
	var NCerrarS = $("#cbSesionPermanete").is(":checked");
	
	if (UName == "" || UPwd == "")
	{
		var txtMsg = $("#Texto1").text();
		new Messi(txtMsg, 
					{
						title: 'Volcafe', 
						titleClass: 'anim error', 
						buttons: 
							[
								{
									id: 0, 
									label: 'Cerrar', 
									val: 'X'
								}
							],
						modal: true,
						width: (window.innerWidth - 25)
					});
	}
	else
	{
		$("#loadingAJAX").show();
		
		$(document).delay(1000);
		
		$.get("http://200.30.150.165:8080/webservidor/index.php",
		{
			"leer"	: "16",
			"uuid"	: UPwd,
			"asesor": UName
		},
		function (data)
		{
			xml = StringToXML(data);
			root = xml.documentElement;
			
			if ($(root).find("EMPRESA").text() == "")
			{
				var txtMsg = $("#tErrorLogin").text();
				new Messi(txtMsg, 
					{
						title: 'Volcafe', 
						titleClass: 'anim error', 
						buttons: 
							[
								{
									id: 0, 
									label: 'Cerrar', 
									val: 'X'
								}
							],
						modal: true,
						width: (window.innerWidth - 25)
					});
			}
			else
			{
				window.sessionStorage.UserLogin = UName;
				window.sessionStorage.UserEmpresa = $(root).find("EMPRESA").text();
				var txtMsg = $("#tLogIn").text();
				new Messi(txtMsg, 
					{
						title: 'Volcafe', 
						titleClass: 'anim success', 
						buttons: 
							[
								{
									id: 0, 
									label: 'Cerrar', 
									val: 'X'
								}
							],
						modal: true,
						width: (window.innerWidth - 25),
						callback: function (val)
						{
							window.location = "#vc_grupos"
						}
					});
			}
			$("#loadingAJAX").hide();
		},"text")
		.fail(function ()
		{
			var txtMsg = $("#tNoInternet").text();
			new Messi(txtMsg, 
				{
					title: 'Volcafe', 
					titleClass: 'anim error', 
					buttons: 
						[
							{
								id: 0, 
								label: 'Cerrar', 
								val: 'X'
							}
						],
					modal: true,
					width: (window.innerWidth - 25)
				});
				$("#loadingAJAX").hide();
		});
		

	}
}
