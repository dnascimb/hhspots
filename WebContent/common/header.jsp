<div class="headercolmask headerthreecol">
	<div class="headercolmid">
		<div class="headercolleft">
			<div class="headercol1">
				<div class="searchbox">
					<s:bean name="java.util.HashMap" id="qTableLayout">
	   					 <s:param name="tablecolspan" value="%{4}" />
					</s:bean>

					<s:form method="post" theme="hh_style" namespace="/search" action="results" id="form1">
						<s:textfield name="search_text" cssClass="inputlogin" />
						<s:textfield name="search_location" cssClass="inputlogin" />
						<s:submit value="Search" align="center">
					        <s:param name="align" value="%{'center'}" />
					    </s:submit>
						
					</s:form>
					
				</div>
			</div>
			<div class="headercol2">
			<p>HH Logo</p>
			</div>
			<div class="headercol3">
			<p>Username + stats </p>
			</div>
		</div>
	</div>
</div>
