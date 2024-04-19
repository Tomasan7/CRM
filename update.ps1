param (
    [string] $commitMessage = ""
)

try {
    if ($commitMessage -eq "")
    {
        $commitMessage = Get-Date
    }

    git checkout trash
    git add .
    git commit -m "$commitMessage"
    git push

    $response = Invoke-WebRequest -Uri "http://s-crm-c3c5.dev.spsejecna.net/update.php"
    Write-Output $response.Content
}
catch {
    Write-Output "An error occurred: $_"
}
