

app.controller('CreateBlogController', function ($scope,$routeParams, $http, Upload, SubjectService) {
    $scope.activeBlogNavItem();
    
    $scope.alerts = new Array();
    $scope.title = "";
    $scope.rows = new Array();
    $scope.selectedSubjects = new Array();
    $scope.postUrl = "/Admin/Blog/Create";

    //here are the data related to edit
    $scope.blogId = 0;

    if (parseInt($routeParams.blogId) > 0)
    {
        //blogId is greater than zero. So it will be edit. Not create
        $scope.postUrl = "/Admin/Blog/Update";
        $scope.blogId = parseInt($routeParams.blogId);
        
        //initialize data related to edit here
        $http.get("/Admin/Blog/GetBlog?blogId=" + $scope.blogId).then(function (response) {
            $scope.title = response.data.Title;
            
            var contents = response.data.Contents;
            if(contents.length>0)
            {
                for(var i=0;i<contents.length;i++)
                {
                  
                    var content = contents[i];
                    var row = { type: content.Type, value: content.Data, file: null, filePath: content.Data }
                    $scope.rows.push(row);
                }
            }
            var subjects = response.data.Subjects;
            if(subjects.length>0)
            {
                for(var i=0;i<subjects.length; i++)
                {
                    var subject = subjects[i];
                    $scope.selectedSubjects.push(subject.Id);
                }
            }
        });
    }

    $scope.addTextRow = function()
    {
        var row = { type: $scope.contentTypeText , value: "" , file : null , filePath : null }
        $scope.rows.push(row)
    }

    $scope.addQuoteRow = function()
    {
        var row = { type: $scope.contentTypeQuote, value: "", file: null, filePath: null }
        $scope.rows.push(row)
    }

    $scope.addPhotoRow = function()
    {
        var row = { type: $scope.contentTypePhoto , value: "" , file : null, filePath : null }
        $scope.rows.push(row)
    }

    $scope.addCodeRow = function()
    {
        var row = { type: $scope.contentTypeCode , value: "" , file : null , filePath : null }
        $scope.rows.push(row)
    }

    $scope.addYoutubeVideoRow = function()
    {
        //contentTypeYoutubeVideo
        var row = { type: $scope.contentTypeYoutubeVideo, value: "", file: null, filePath: null }
        $scope.rows.push(row)
    }

    $scope.saveBlog = function()
    {
        var contents = new Array();
        var fd = new FormData();
        fd.append("Id", $scope.blogId);
        fd.append('Title', $scope.title);

        if ($scope.selectedSubjects.length < 1)
        {
            showAlert("At least a subject has to be selected", "danger");
            return;
        }

        for (var i = 0; i < $scope.selectedSubjects.length; i++)
        {
            fd.append('Subjects[' + i + ']', $scope.selectedSubjects[i]);
        }

        for(var i=0; i<$scope.rows.length; i++)
        {
            if($scope.rows[i].type==$scope.contentTypeCode)
            {
                var value = $scope.rows[i].value;
                if (value == "" || value == null)
                {
                    showAlert("Code field should not be empty" , "danger");
                    return;
                }
                else {
                    fd.append('Content[' + i + '].Code', value);
                }
            }
            else if($scope.rows[i].type==$scope.contentTypeText)
            {
                var value = $scope.rows[i].value;
                if (value == "" || value == null) {
                    showAlert("Text field should not be empty", "danger");
                    return;
                }
                else {
                    fd.append('Content[' + i + '].Text', value);

                }
            }
            else if($scope.rows[i].type==$scope.contentTypePhoto)
            {
                var file = $scope.rows[i].file;
                var filePath = $scope.rows[i].filePath;
                if(file==null)
                {
                    if ($scope.blogId < 1)
                    {
                        showAlert("Photo file is required", "danger");
                        return;
                    }
                }
                else {
                    fd.append('Content[' + i + '].Photo', file);
                }
                fd.append('Content[' + i + '].PhotoPath', filePath);
            }
            else if($scope.rows[i].type==$scope.contentTypeQuote)
            {
                var value = $scope.rows[i].value;
                if (value == "" || value == null) {
                    showAlert("Quote field should not be empty", "danger");
                    return;
                }
                else {
                    fd.append('Content[' + i + '].Quote', value);

                }
            }
            else if($scope.rows[i].type==$scope.contentTypeYoutubeVideo)
            {
                var value = $scope.rows[i].value;
                if (value == "" || value == null) {
                    showAlert("Input url value for Youtube Video", "danger");
                    return;
                }
                else {
                    fd.append('Content[' + i + '].YoutubeVideo', value);

                }
            }
         
        }
        

        $http.post($scope.postUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })

        .success(function () {
            if($scope.blogId>0)
            {
                showAlert("Blog successfully updated", "success");
            }
            else {
                resetForm();
                showAlert("Blog successfully created", "success");
            }
        })

        .error(function () {
            alert('Opps.. Something went wrong!')
        });

    }

    $scope.removeRow = function(index)
    {
        $scope.rows.splice(index, 1);
    }

    $scope.closeAlerts = function()
    {
        $scope.alerts = new Array();
    }

    $scope.toggleSubjectSelection = function(id)
    {
        var index = $scope.selectedSubjects.indexOf(id);
        if(index>-1)
        {
            $scope.selectedSubjects.splice(index, 1);
        }
        else {
            $scope.selectedSubjects.push(id)
        }
    }

    function showAlert(msg, type)
    {
        $scope.alerts = new Array();
        $scope.alerts.push({ msg : msg , type : type })
    }

    function resetForm()
    {
        $scope.selectedSubjects = new Array();
        $scope.rows = new Array();
        $scope.title = "";
    }
})

