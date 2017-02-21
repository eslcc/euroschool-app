/* eslint-env jest */
//<editor-fold desc="Sample response">
const TEST_RESPONSE = `
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<META HTTP-EQUIV="Refresh" CONTENT=600; > 
<title>Untitled Document</title>



<link href="ecole.css" rel="stylesheet" type="text/css">
<style type="text/css">
<!--
body {
	background-color: #000000;
}
body,td,th {
	color: #FFFFFF;
}
.style1 {
	font-size: 24px;
	font-weight: bold;
}
.style2 {
	font-size: 24px;
	
}
-->
</style></head>

<body>
<p class="style1">Teachers Absent</p>
<p class="style2">Mon Feb 06 2017</p>

<p class="style2">      <img src="images/bogus_star_bullet_white.gif" width="12" height="11"> Mrs. Testface (CE)       
        <font size ="-1"> <br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        -S6-        
        </font><br>
     
              <img src="images/bogus_star_bullet_white.gif" width="12" height="11"> Mr.Testdude    
        <font size ="-1"> <br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                
        </font><br>
     
              <img src="images/bogus_star_bullet_white.gif" width="12" height="11"> Mrs. Testspacebeforename T.     
        <font size ="-1"> <br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                
        </font><br>
     
              <img src="images/bogus_star_bullet_white.gif" width="12" height="11"> Mr.Testperson     
        <font size ="-1"> <br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                
        </font><br>     
        </p>
</body>
</html>
`;
//</editor-fold>

import getAbsences from './absences';
import { Response } from 'node-fetch';

describe('Absences', () => {
    beforeAll(() => {
       global.fetch = jest.fn(() => Promise.resolve(new Response(TEST_RESPONSE, {
           status: 200,
       })));
    });

    it('gives the right names', async() => {
        const result = await getAbsences();
        expect(result).toEqual(["Mrs. Testface (CE)", "Mr.Testdude", "Mrs. Testspacebeforename T.", "Mr.Testperson"]);
    });
});
