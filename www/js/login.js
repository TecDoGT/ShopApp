
function ValEntrada ()
{
	//var UCode = $("#tbUserCode").val();
	var UName = $("#tbUserName").val();
	var UPwd  = $("#tbUserPassWord").val();
	
	UName = UName.toUpperCase();
	
	//var NCerrarS = $("#cbSesionPermanete").is(":checked");
	
	if (UName == "" || UPwd == "")
	{
		var txtMsg = $("#Texto1").text();
		new Messi(txtMsg, 
					{
						title: 'Kannel Mobil', 
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
		
		//if (navigator.onLine)
		if (true)
		{
			$.post("http://200.30.150.165:8080/webservidor2/mediador.php",
			{
				"pwd"	: UPwd,
				"user"	: UName
			},
			function (data)
			{
				if (data.ingreso != 1)
				{
					var txtMsg = $("#tErrorLogin").text();
					new Messi(txtMsg, 
						{
							title: 'Kannel Mobil', 
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
					window.sessionStorage.UserEmpresa = data.usrEmpresa;
					window.sessionStorage.UserName = data.nombreUser;
					window.sessionStorage.UserPais = data.usrPais;
					
					var rs = db.SELECT("movil_User", function (row)
					{
						return (row.userName == UName);
					});
					
					if (rs.length == 0)
					{
						var dataValues = 
						[
							{
								userName: UName,
								passWord: UPwd,
								userPais: data.usrPais,
								Empresa: data.usrEmpresa
							}
						];
						db.INSERT_INTO("movil_User", dataValues);
					}
					
					
					var txtMsg = $("#tLogIn").text();
					new Messi(txtMsg, 
						{
							title: 'Kannel Mobil', 
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
								window.location = "#IndexPage"
							}
						});
				}
				$("#loadingAJAX").hide();
			},"json")
			.fail(function ()
			{
				rs = db.SELECT("movil_User", function (row)
				{
					return ( row.userName == UName && row.passWord == UPwd );
				});
				
				if (rs.length > 0)
				{
					window.sessionStorage.UserLogin = rs[0].userName;
					window.sessionStorage.UserEmpresa = rs[0].Empresa;
					window.sessionStorage.UserPais = rs[0].userPais;
					var txtMsg = $("#tLogIn").text();
					new Messi(txtMsg, 
						{
							title: 'Kannel Mobil', 
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
								window.location = "#IndexPage"
							}
						});
				}
				else
				{
					var txtMsg = $("#tErrorLogin").text();
					new Messi(txtMsg, 
						{
							title: 'Kannel Mobil', 
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
				$("#loadingAJAX").hide();
			});
		}
		else
		{
			rs = db.SELECT("movil_User", function (row)
			{
				return ( userName == UName && passWord == UPwd );
			});
			
			if (rs.length > 0)
			{
				window.sessionStorage.UserLogin = rs.userName;
				window.sessionStorage.UserEmpresa = rs.Empresa;
				window.sessionStorage.UserPais = rs.userPais;
			}
		}
		

	}
}
