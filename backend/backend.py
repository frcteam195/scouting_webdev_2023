
from os import system
from flask import Flask, jsonify, request, json, Response
from flask_mysqldb import MySQL
from flask_cors import CORS
import MySQLdb.cursors
from json import dumps
import configparser


config = configparser.ConfigParser()
config.read('config.ini')

app=Flask(__name__)
CORS(app)

app.secret_key = 'secret key'

app.config['MYSQL_HOST'] = config['mysqlDB']['host']
app.config['MYSQL_PORT'] = int(config['mysqlDB']['port'])
app.config['MYSQL_USER'] = config['mysqlDB']['user']
app.config['MYSQL_PASSWORD'] = config['mysqlDB']['pass']
app.config['MYSQL_DB'] = config['mysqlDB']['db']

mysql = MySQL(app)


@app.route("/")
def hello():
    return "Hello Worlds!"

@app.route("/harish/")
def hello2():
    return "Hello Harish!!!"

# Get Analysis Data
@app.route("/analysis/", methods =['GET', 'POST'])
def get_analysis():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT cea.*, at.AnalysisType "
                "FROM CEanalysis cea, analysisTypes at "
                "WHERE cea.AnalysisTypeID = at.analysisTypeID order by analysisTypeID;")
    data = cursor.fetchall()	
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response


# Get Event Team List
@app.route("/currteam/", methods =['GET', 'POST'])
def get_currteam():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT t.team "
                "FROM teams t, events e "
                "WHERE t.eventID = e.eventID order by cast(t.team as int);")
    data = cursor.fetchall()
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response
    
    # get event info 
@app.route("/event/", methods =['GET', 'POST'])
def get_event():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("select * from events where currentEvent = 1; ")
    data = cursor.fetchall()
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response




# get scouter info
@app.route("/scouters/", methods = ['GET', 'POST']) 
def get_scouters():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("select s.scouterID, s.firstName, s.lastName "
    "from scouters s; ")
    data = cursor.fetchall()
    response = app.response_class(

        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response 


# Get Pit Data
@app.route("/pitdata/", methods =['GET', 'POST'])
def get_pitdata():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT p.*, d.driveType, t.teamName, teamLocation "
                "FROM pit p "
                "INNER JOIN teams t on p.Team = t.team "
                "LEFT JOIN driveTypes d on p.driveTypeID=d.driveTypeID; ")
    data = cursor.fetchall()
    response = app.response_class(

        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

# Get drive base types 
@app.route("/drivebasetypes/", methods =['GET', 'POST'])
def get_dbtypes():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT d.* "
    "FROM driveBaseTypes d; ")
    data = cursor.fetchall()
    response = app.response_class(

        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

# Get drive motor types 
@app.route("/drivemotortypes/", methods =['GET', 'POST'])
def get_dmtypes():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT d.* "
    "FROM driveMotorTypes d; ")
    data = cursor.fetchall()
    response = app.response_class(

        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

# Get manipulator types 
@app.route("/manipulatortypes/", methods =['GET', 'POST'])
def get_mtypes():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT m.* "
    "FROM manipulatorTypes m; ")
    data = cursor.fetchall()
    response = app.response_class(

        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

# Get super climb types 
@app.route("/superclimbtypes/", methods =['GET', 'POST'])
def get_climbtypes():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT s.* "
    "FROM superClimbTypes s; ")
    data = cursor.fetchall()
    response = app.response_class(

        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

# Get build types 
@app.route("/buildtypes/", methods =['GET', 'POST'])
def get_buildtypes():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT b.* "
    "FROM buildTypes b; ")
    data = cursor.fetchall()
    response = app.response_class(

        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

# Get center of gravity  types 
@app.route("/cgtypes/", methods =['GET', 'POST'])
def get_cgtypes():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT c.* "
    "FROM centerGravityTypes c; ")
    data = cursor.fetchall()
    response = app.response_class(

        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response


# Get Matches Data
@app.route("/matches/", methods =['GET', 'POST'])
def get_matches():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT m.matchNum, m.red1, m.red2, m.red3, m.blue1, m.blue2, m.blue3 "
                "FROM matches m, events e "
                "WHERE e.eventID = m.eventID "
                "AND e.currentEvent = 1;")
    data = cursor.fetchall()	
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json' 
    )
    return response
    
# Get 195Data
@app.route("/195Data/", defaults={'team': None})
@app.route("/195Data/<team>")
def get_195Data(team):
    #args = request.args
    #team = args.get('team')
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    if team is not None:
        cursor.execute("SELECT m.* "
                "FROM MatchScouting m, Events e "
                "WHERE e.EventID = m.EventID "
                "AND Team="+team+" "
                "AND e.CurrentEvent = 1;")
    else: 
        cursor.execute("SELECT m.* "
                "FROM MatchScouting m, Events e "
                "WHERE e.EventID = m.EventID "
                "AND e.CurrentEvent = 1;")    
    data = cursor.fetchall()
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

# Get Matches Info
@app.route("/matchinfo/", methods =['GET', 'POST'])
def get_matchinfo():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT m.* "
                "FROM matches m, events e "
                "WHERE e.eventID = m.eventID "
                "AND e.currentEvent = 1 ORDER BY m.matchNum;")
    data = cursor.fetchall()	
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json' 
    )
    return response

# Get Summary Data
@app.route("/summary/", methods =['GET', 'POST'])
def get_summary():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("select a.* from CEanalysisGraphs a, events e "
                    "where a.eventID=e.eventID "
                    "and e.currentEvent = 1;")
    data = cursor.fetchall()
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response


# Get Level1 Data
@app.route("/matchscouting/", methods =['GET', 'POST'])
def get_matchscouting():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("select ms.*, m.blue1, m.blue2, m.blue3, m.red1, m.red2, m.red3, t.teamName "
    "from matchScouting ms, matches m, events e, teams t "
    "where ms.matchID = m.matchID "
    "AND e.eventID = 1 "
    "AND m.eventID = e.eventID and allianceStationID = 1 "
    "AND t.eventID = ms.eventID "
    "AND t.team = ms.team;")
    data = cursor.fetchall()
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

#get pit scouting data
@app.route("/pitscouting/", methods =['GET', 'POST'])
def get_pitscouting():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("select p.*, t.teamName "
    "from pit p, events e, teams t "
    "where e.eventID = 1 "
    "AND p.eventID = e.eventID "
    "and t.eventID = p.eventID "
    "AND t.team = p.team;") 
    data = cursor.fetchall()
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

    # Get Level2 Data
@app.route("/matchscoutingl2/", methods =['GET', 'POST'])
def get_matchscoutingl2():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("select ms.*, m.blue1, m.blue2, m.blue3, m.red1, m.red2, m.red3, t.teamName "
    "from matchScoutingL2 ms, matches m, events e, teams t "
    "where ms.matchID = m.matchID "
    "AND e.eventID = 1 "
    "AND m.eventID = e.eventID and allianceStationID = 1 "
    "AND t.eventID = ms.eventID "
    "AND t.team = ms.team;") 
    data = cursor.fetchall()
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response




# Get Analysis Type Data
@app.route("/types/", methods =['GET', 'POST'])
def get_types():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT analysisTypeID, analysisType, teamPicker, matchReport, "
                   "robotSnapshot, developer, summary, sortOrder from analysisTypes;")
    data = cursor.fetchall()	
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response


# Get Analysis Type Data
@app.route("/level2", methods =['GET', 'POST'])
def get_level2():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("select a.matchNum, a.team, a.commentOff, a.commentDef, a.goodOffBot, a.goodDefBot "
                   "from matchScoutingL2 a, events e "
                   "where a.eventID=e.eventID "
                   "and e.currentEvent = 1 "
                   "order by matchNum;")
    data = cursor.fetchall()	
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

# Get Final 24 Data
@app.route("/final24Old", methods =['GET'])
def get_final24Old():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * from final24;")
    data = cursor.fetchall()	
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response


# Update FInal24 Data
@app.route("/final24-update", methods =['POST'])
def post_final24():
    # TODO: IMPLEMENT ME

    if not request.is_json:
        return Response('Invalid submission, please submit as JSON.', status=400)
    data = request.json

    for line in data:
        print(line)

    
    table = request.args.get('table', default = '*', type = str)

    print("Updating " + table + " table")

    

    # SortOrder is gone from the frontend code - you'll need to iterate through
    # the rows and get SortOrder from the position of the row. Something like

    with mysql.connection.cursor(MySQLdb.cursors.DictCursor) as cursor:
        for pos, team_selection in enumerate(data):
            #cursor.execute('UPDATE Final24 SET Team =% s where SortOrder=%s', (team_selection['Team'],pos+1))
            #query1='INSERT INTO '+table+' VALUES (%s, %s) ON DUPLICATE KEY UPDATE Team=%s',(pos+1, team_selection['Team'],team_selection['Team'])
            ##print(query1)
            #cursor.execute(query1)
            cursor.execute('INSERT INTO '+table+' VALUES (%s, %s) ON DUPLICATE KEY UPDATE team=%s',(pos+1, team_selection['team'],team_selection['team']))
        mysql.connection.commit()

    return '1'










# Update Pit Scouting Data
@app.route("/pit-update", methods =['POST'])
def post_pitscouting():
    # TODO: IMPLEMENT ME

    if not request.is_json:
        return Response('Invalid submission, please submit as JSON.', status=400)
    data = request.json

    for line in data:
        print(line)

    # SortOrder is gone from the frontend code - you'll need to iterate through
    # the rows and get SortOrder from the position of the row. Something like

    with mysql.connection.cursor(MySQLdb.cursors.DictCursor) as cursor:
        for pos, pit_data in enumerate(data):
            #cursor.execute('UPDATE Final24 SET Team =% s where SortOrder=%s', (team_selection['Team'],pos+1))
            #query1='INSERT INTO '+table+' VALUES (%s, %s) ON DUPLICATE KEY UPDATE Team=%s',(pos+1, team_selection['Team'],team_selection['Team'])
            ##print(query1)
            #cursor.execute(query1)
            cursor.execute('UPDATE pit SET buildComments = %s, buildQuality = %s, buildTypeID = %s, centerGravityTypeID = %s, dedicatedGroundIntake = %s, '
                'driveBaseTypeID = %s, driveMotorTypeID = %s, driveTypeID = %s, electricalComments= %s, electricalQuality = %s, '
                'generalComments = %s, imageLink = %s, manipulatorTypeID = %s, robotDurability = %s, robotHeight = %s, '
                'robotLength = %s, robotWidth = %s, scouterID = %s, scoutingStatus = %s, superClimbTypeID = %s '
                'where team = %s and eventID = %s',(pit_data['buildComments'],pit_data['buildQuality'],pit_data['buildTypeID'],pit_data['centerGravityTypeID'],pit_data['dedicatedGroundIntake'],
                pit_data['driveBaseTypeID'],pit_data['driveMotorTypeID'],pit_data['driveTypeID'],pit_data['electricalComments'],pit_data['electricalQuality'],
                pit_data['generalComments'],pit_data['imageLink'],pit_data['manipulatorTypeID'],pit_data['robotDurability'],pit_data['robotHeight'],
                pit_data['robotLength'],pit_data['robotWidth'],pit_data['scouterID'],pit_data['scoutingStatus'],pit_data['superClimbTypeID'],
                pit_data['team'],pit_data['eventID']))
        mysql.connection.commit()

    return '1'


# Delete Final24 Data
@app.route("/final24", methods =['DELETE'])
def delete_final24():
    # TODO: IMPLEMENT ME

    #if not request.is_json:
    #    return Response('Invalid submission, please submit as JSON.', status=400)
    #data = request.json

    # Would like to loop through JSON file and delete rows on the database.
    # Just need to figure out how to read the JSON file.
    print("*******Deleting Records*********")
    with mysql.connection.cursor(MySQLdb.cursors.DictCursor) as cursor:
      
        cursor.execute('DELETE from Final24 where SortOrder > 0')
        mysql.connection.commit()

    return '1'

# Get DNP List Data
@app.route("/dnp", methods =['GET'])
def get_dnp():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * from DnpList;")
    data = cursor.fetchall()	
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

# Update FInal24 Data
@app.route("/dnp-update", methods =['POST'])
def post_dnp():

    if not request.is_json:
        return Response('Invalid submission, please submit as JSON.', status=400)
    data = request.json

    for line in data:
        print(line)

    # SortOrder is gone from the frontend code - you'll need to iterate through
    # the rows and get SortOrder from the position of the row. Something like

    with mysql.connection.cursor(MySQLdb.cursors.DictCursor) as cursor:
        for pos, team_selection in enumerate(data):
            #cursor.execute('UPDATE Final24 SET Team =% s where SortOrder=%s', (team_selection['Team'],pos+1))
            cursor.execute('INSERT INTO DnpList VALUES (%s, %s) ON DUPLICATE KEY UPDATE Team=%s',(pos+1, team_selection['Team'],team_selection['Team']))
        mysql.connection.commit()

    return '1'

# Get DNP List Data
@app.route("/pick", methods =['GET'])
def get_pick():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * from pickList1;")
    data = cursor.fetchall()	
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

# Get List Data
@app.route("/final24", methods =['GET'])
def get_final24():

    table = request.args.get('table', default = '*', type = str)

    print("Retrieve data from " + table + " table")

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * from "+table+";")
    data = cursor.fetchall()	
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response



if __name__=="__main__":
    app.run(host='0.0.0.0',debug=True)

